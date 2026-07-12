import { authors, posts, tags } from "#site/content";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXContent } from "@/components/mdx-content";
import { getPublishedPost, getPublishedPosts } from "@/lib/content";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts(posts).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getPublishedPost(posts, (await params).slug);
  if (!post) notFound();

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: post.canonicalUrl ?? post.permalink,
    },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPublishedPost(posts, (await params).slug);
  if (!post) notFound();

  const author = authors.find(({ slug }) => slug === post.author);

  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b border-zinc-200 pb-8">
        <p className="text-sm text-zinc-500">
          <time dateTime={post.publishedDate}>
            {dateFormatter.format(new Date(post.publishedDate))}
          </time>
          {author ? (
            <>
              {" · "}
              <Link className="hover:underline" href={`/blog/author/${author.slug}`}>
                {author.name}
              </Link>
            </>
          ) : null}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-8 text-zinc-600">{post.excerpt}</p>
        {post.tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tagSlug) => {
              const tag = tags.find(({ slug }) => slug === tagSlug);
              if (!tag) return null;

              return (
                <li key={tag.slug}>
                  <Link
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-200"
                    href={`/blog/tag/${tag.slug}`}
                  >
                    {tag.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </header>
      <div className="mt-10 space-y-6 text-lg leading-8 text-zinc-700 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-5 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
        <MDXContent code={post.content} />
      </div>
    </article>
  );
}
