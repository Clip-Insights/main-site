#!/usr/bin/env node
/**
 * Migrate WordPress content -> MDX files matching the Velite schema in
 * velite.config.ts (content/posts, content/authors, content/tags).
 *
 * Usage:
 *   WP_BASE_URL=https://clipinsights.com node scripts/migrate-wp-to-mdx.mjs
 *
 * Requires (package.json devDependencies):
 *   npm i -D turndown turndown-plugin-gfm slugify gray-matter
 *
 * What it does:
 *   1. Pulls all posts, authors (users), and categories/tags via the WP REST API
 *   2. Converts each post's rendered HTML -> Markdown via Turndown
 *   3. Downloads the featured image + any inline <img> assets locally
 *   4. Writes one .mdx file per post with frontmatter matching the schema
 *   5. Writes a redirects.json mapping old WP URLs -> new /blog/<slug> paths,
 *      for use in vercel.json / next.config redirects
 *
 * This is a starting point, not a finished pipeline — WP shortcodes, custom
 * Gutenberg blocks (galleries, embeds), and ACF fields will need manual
 * review after the first run. Re-run safely; it overwrites files by slug.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import slugify from 'slugify';
import matter from 'gray-matter';
import { omitUndefined } from '../lib/frontmatter.mjs';
import { getRedirectSourcePath } from '../lib/wp-redirects.mjs';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WP_BASE_URL = process.env.WP_BASE_URL || 'https://clipinsights.com';
const OUT_DIR = process.env.OUT_DIR || path.join(PROJECT_ROOT, 'content');
const IMAGES_DIR = process.env.IMAGES_DIR || path.join(PROJECT_ROOT, 'public/images/posts');
const PER_PAGE = 100;

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});
turndown.use(gfm);

// WP wraps images/galleries in figure/caption markup Turndown doesn't handle
// well by default — keep captions as plain italic text under the image.
turndown.addRule('wpFigureCaption', {
  filter: (node) => node.nodeName === 'FIGURE',
  replacement: (content) => `${content}\n`,
});

async function wpFetch(endpoint) {
  const results = [];
  let page = 1;
  for (;;) {
    const url = `${WP_BASE_URL}/wp-json/wp/v2/${endpoint}?per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 400 && page > 1) break; // ran past last page
      throw new Error(`WP fetch failed: ${url} -> ${res.status}`);
    }
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    results.push(...batch);
    if (batch.length < PER_PAGE) break;
    page += 1;
  }
  return results;
}

async function downloadImage(url, destDir) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    const filename = `${slugify(path.basename(url, ext), { lower: true })}${ext}`;
    const destPath = path.join(destDir, filename);
    await fs.mkdir(destDir, { recursive: true });
    const buffer = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(destPath, buffer);
    return `/images/posts/${filename}`;
  } catch (err) {
    console.warn(`  ! failed to download image ${url}: ${err.message}`);
    return null;
  }
}

function stripHtmlComments(html) {
  // removes leftover Gutenberg block comments (<!-- wp:paragraph -->)
  return html.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '');
}

async function rewriteInlineImages(markdown, destDir) {
  const imgRegex = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g;
  let match;
  let result = markdown;
  const seen = new Map();
  while ((match = imgRegex.exec(markdown)) !== null) {
    const [full, alt, url] = match;
    if (seen.has(url)) continue;
    const localPath = await downloadImage(url, destDir);
    if (localPath) {
      result = result.split(full).join(`![${alt}](${localPath})`);
      seen.set(url, localPath);
    }
  }
  return result;
}

function toISODate(wpDateGmt) {
  return new Date(`${wpDateGmt}Z`).toISOString();
}

async function migrateAuthors() {
  console.log('Fetching authors...');
  const users = await wpFetch('users');
  await fs.mkdir(path.join(OUT_DIR, 'authors'), { recursive: true });

  const slugMap = new Map(); // wp user id -> slug

  for (const user of users) {
    const slug = slugify(user.slug || user.name, { lower: true });
    slugMap.set(user.id, slug);

    const fm = {
      name: user.name,
      slug,
      bio: (user.description || '').trim() || undefined,
    };
    const content = matter.stringify('', omitUndefined(fm));
    await fs.writeFile(path.join(OUT_DIR, 'authors', `${slug}.md`), content);
  }
  console.log(`  wrote ${users.length} author files`);
  return slugMap;
}

async function migrateTerms(endpoint, dir) {
  console.log(`Fetching ${endpoint}...`);
  const terms = await wpFetch(endpoint);
  await fs.mkdir(path.join(OUT_DIR, dir), { recursive: true });

  const slugMap = new Map(); // wp term id -> slug

  for (const term of terms) {
    const slug = slugify(term.slug, { lower: true });
    slugMap.set(term.id, slug);

    const fm = {
      name: term.name,
      slug,
      description: term.description || undefined,
    };
    const content = matter.stringify('', omitUndefined(fm));
    await fs.writeFile(path.join(OUT_DIR, dir, `${slug}.md`), content);
  }
  console.log(`  wrote ${terms.length} ${dir} files`);
  return slugMap;
}

async function migratePosts(authorSlugs, tagSlugs) {
  console.log('Fetching posts...');
  const posts = await wpFetch('posts?_embed');
  await fs.mkdir(path.join(OUT_DIR, 'posts'), { recursive: true });

  const redirects = [];

  for (const post of posts) {
    const slug = slugify(post.slug, { lower: true });
    const postImageDir = path.join(IMAGES_DIR, slug);

    let markdown = stripHtmlComments(post.content.rendered);
    markdown = turndown.turndown(markdown);
    markdown = await rewriteInlineImages(markdown, postImageDir);

    let coverImage;
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    if (featuredMedia?.source_url) {
      coverImage = await downloadImage(featuredMedia.source_url, postImageDir);
    }

    const author = authorSlugs.get(post.author) ?? 'unknown';
    const tags = (post.tags || [])
      .map((id) => tagSlugs.get(id))
      .filter(Boolean);

    const excerptText = turndown
      .turndown(stripHtmlComments(post.excerpt.rendered))
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 400);

    const fm = {
      title: post.title.rendered,
      slug,
      publishedDate: toISODate(post.date_gmt),
      updatedDate: post.modified_gmt ? toISODate(post.modified_gmt) : undefined,
      draft: post.status !== 'publish',
      author,
      tags,
      excerpt: excerptText || post.title.rendered,
      coverImage,
      coverImageAlt: featuredMedia?.alt_text || undefined,
      legacyWpSlug: post.slug,
      legacyWpId: post.id,
    };

    const fileContent = matter.stringify(markdown, omitUndefined(fm));
    await fs.writeFile(path.join(OUT_DIR, 'posts', `${slug}.mdx`), fileContent);

    redirects.push({
      source: getRedirectSourcePath(post.link, WP_BASE_URL),
      destination: `/blog/${slug}`,
      permanent: true,
    });
  }

  const redirectsPath = path.join(PROJECT_ROOT, 'redirects.json');
  const temporaryRedirectsPath = `${redirectsPath}.tmp`;
  await fs.writeFile(temporaryRedirectsPath, JSON.stringify(redirects, null, 2));
  await fs.rename(temporaryRedirectsPath, redirectsPath);
  console.log(`  wrote ${posts.length} post files + redirects.json`);
}

async function main() {
  console.log(`Migrating from ${WP_BASE_URL} ...\n`);
  const authorSlugs = await migrateAuthors();
  const tagSlugs = await migrateTerms('tags', 'tags');
  await migrateTerms('categories', 'categories'); // written for reference; not wired into the schema above
  await migratePosts(authorSlugs, tagSlugs);
  console.log('\nDone. Review content/posts for shortcodes, embeds, and custom blocks that need manual cleanup.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
