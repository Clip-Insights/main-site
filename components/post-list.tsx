import type { Post } from "#site/content";
import { authors, tags } from "#site/content";
import Link from "next/link";

import { getBlogPageHref } from "@/lib/content";

interface PostListProps {
  posts: readonly Post[];
  emptyMessage?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function PostList({
  posts,
  emptyMessage = "No posts found.",
}: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-zinc-600">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => {
        const author = authors.find(({ slug }) => slug === post.author);

        return (
          <article
            key={post.slug}
            className="border-b border-zinc-200 pb-8 last:border-0"
          >
            <p className="text-sm text-zinc-500">
              <time dateTime={post.publishedDate}>
                {dateFormatter.format(new Date(post.publishedDate))}
              </time>
              {author ? (
                <>
                  {" · "}
                  <Link
                    className="hover:text-zinc-950 hover:underline"
                    href={`/blog/author/${author.slug}`}
                  >
                    {author.name}
                  </Link>
                </>
              ) : null}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              <Link
                className="hover:text-zinc-600"
                href={`/blog/${post.slug}`}
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 leading-7 text-zinc-600">{post.excerpt}</p>
            {post.tags.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
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
          </article>
        );
      })}
    </div>
  );
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6"
      aria-label="Blog pagination"
    >
      {currentPage > 1 ? (
        <Link
          className="font-medium hover:underline"
          href={getBlogPageHref(currentPage - 1)}
        >
          Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-zinc-500">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          className="font-medium hover:underline"
          href={getBlogPageHref(currentPage + 1)}
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
