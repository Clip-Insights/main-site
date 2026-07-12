import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Post } from "#site/content";

import {
  getBlogPageHref,
  getPostsByAuthor,
  getPostsByTag,
  getPublishedPost,
  getPublishedPosts,
  getReferencedSlugs,
  paginatePosts,
  parsePageNumber,
} from "./content.ts";

const makePost = (
  slug: string,
  publishedDate: string,
  overrides: Partial<Post> = {},
): Post => ({
  title: slug,
  slug,
  publishedDate,
  draft: false,
  author: "team",
  tags: [],
  excerpt: `${slug} excerpt`,
  content: "",
  raw: "",
  permalink: `/blog/${slug}`,
  ...overrides,
});

describe("content queries", () => {
  const posts = [
    makePost("oldest", "2024-01-01T00:00:00.000Z", {
      tags: ["updates"],
    }),
    makePost("draft", "2026-01-01T00:00:00.000Z", { draft: true }),
    makePost("newest", "2025-01-01T00:00:00.000Z"),
    makePost("guest", "2023-01-01T00:00:00.000Z", {
      author: "guest",
    }),
  ];

  it("excludes drafts and sorts published posts newest first", () => {
    assert.deepEqual(
      getPublishedPosts(posts).map(({ slug }) => slug),
      ["newest", "oldest", "guest"],
    );
  });

  it("returns only a published post for a matching slug", () => {
    assert.equal(getPublishedPost(posts, "newest")?.slug, "newest");
    assert.equal(getPublishedPost(posts, "draft"), undefined);
    assert.equal(getPublishedPost(posts, "missing"), undefined);
  });

  it("filters published posts by author and tag", () => {
    assert.deepEqual(
      getPostsByAuthor(posts, "team").map(({ slug }) => slug),
      ["newest", "oldest"],
    );
    assert.deepEqual(
      getPostsByTag(posts, "updates").map(({ slug }) => slug),
      ["oldest"],
    );
  });

  it("returns deterministic page slices", () => {
    const publishedPosts = getPublishedPosts(posts);

    assert.deepEqual(paginatePosts(publishedPosts, 2, 1), {
      items: [publishedPosts[1]],
      currentPage: 2,
      totalPages: 3,
    });
  });

  it("keeps empty collections on page one", () => {
    assert.deepEqual(paginatePosts([], 1, 10), {
      items: [],
      currentPage: 1,
      totalPages: 1,
    });
  });

  it("parses positive integer page parameters", () => {
    assert.equal(parsePageNumber(undefined), 1);
    assert.equal(parsePageNumber("2"), 2);
    assert.equal(parsePageNumber("0"), undefined);
    assert.equal(parsePageNumber("-1"), undefined);
    assert.equal(parsePageNumber("1.5"), undefined);
    assert.equal(parsePageNumber(["1", "2"]), undefined);
  });

  it("builds a self-canonical URL for each blog page", () => {
    assert.equal(getBlogPageHref(1), "/blog");
    assert.equal(getBlogPageHref(2), "/blog?page=2");
  });

  it("keeps only unique references that have matching collection entries", () => {
    assert.deepEqual(
      getReferencedSlugs(
        ["team", "missing", "team", "guest"],
        ["team", "guest"],
      ),
      ["team", "guest"],
    );
  });
});
