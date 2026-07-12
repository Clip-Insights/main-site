import { posts, tags } from "#site/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostList } from "@/components/post-list";
import { getPostsByTag } from "@/lib/content";

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return tags.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = tags.find((candidate) => candidate.slug === slug);
  if (!tag) notFound();

  return {
    title: tag.name,
    description: tag.description ?? `Posts tagged ${tag.name}.`,
    alternates: {
      canonical: `/blog/tag/${tag.slug}`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = tags.find((candidate) => candidate.slug === slug);
  if (!tag) notFound();

  const taggedPosts = getPostsByTag(posts, tag.slug);

  return (
    <>
      <header className="mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Tag
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {tag.name}
        </h1>
        {tag.description ? (
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            {tag.description}
          </p>
        ) : null}
      </header>
      <PostList
        posts={taggedPosts}
        emptyMessage={`No published posts tagged ${tag.name}.`}
      />
    </>
  );
}
