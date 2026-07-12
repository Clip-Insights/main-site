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
      <header className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
          Guides and product updates from Clip Insights.
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
