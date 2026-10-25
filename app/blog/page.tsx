import { posts } from "#site/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Pagination, PostList } from "@/components/post-list";
import {
  getBlogPageHref,
  getPublishedPosts,
  paginatePosts,
  parsePageNumber,
} from "@/lib/content";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const page = parsePageNumber((await searchParams).page) ?? 1;

  return {
    title: page === 1 ? "Blog" : `Blog – Page ${page}`,
    description: "Guides and product updates from Clip Insights.",
    alternates: {
      canonical: getBlogPageHref(page),
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parsePageNumber((await searchParams).page);
  if (page === undefined) notFound();

  const pagination = paginatePosts(getPublishedPosts(posts), page);
  if (page > pagination.totalPages) notFound();

  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">THE STUDY JOURNAL</p>
        <h1>A better way to learn<br/>from what you watch.</h1>
        <p>
          Practical workflows, thoughtful notes, and a closer look at the tools. Something useful for your next session.
        </p>
      </header>
      <PostList posts={pagination.items} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </>
  );
}
