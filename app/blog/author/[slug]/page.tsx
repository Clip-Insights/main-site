import { authors, posts } from "#site/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostList } from "@/components/post-list";
import { getPostsByAuthor } from "@/lib/content";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = authors.find((candidate) => candidate.slug === slug);
  if (!author) notFound();

  return {
    title: author.name,
    description: author.bio ?? `Posts by ${author.name}.`,
    alternates: {
      canonical: `/blog/author/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = authors.find((candidate) => candidate.slug === slug);
  if (!author) notFound();

  const authorPosts = getPostsByAuthor(posts, author.slug);

  return (
    <>
      <header className="mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Author
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {author.name}
        </h1>
        {author.bio ? (
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            {author.bio}
          </p>
        ) : null}
      </header>
      <PostList
        posts={authorPosts}
        emptyMessage={`No published posts by ${author.name}.`}
      />
    </>
  );
}
