import type { Post } from "#site/content";

export const POSTS_PER_PAGE = 10;

export function getBlogPageHref(page: number) {
  return page === 1 ? "/blog" : `/blog?page=${page}`;
}

export function getReferencedSlugs(
  references: Iterable<string>,
  knownSlugs: readonly string[],
) {
  const knownSlugSet = new Set(knownSlugs);

  return Array.from(new Set(references)).filter((slug) =>
    knownSlugSet.has(slug),
  );
}

export function parsePageNumber(
  value: string | string[] | undefined,
): number | undefined {
  if (value === undefined) return 1;
  if (Array.isArray(value) || !/^[1-9]\d*$/.test(value)) return undefined;

  const page = Number(value);
  return Number.isSafeInteger(page) ? page : undefined;
}

export function getPublishedPosts(source: readonly Post[]): Post[] {
  return source
    .filter((post) => !post.draft)
    .toSorted(
      (left, right) =>
        Date.parse(right.publishedDate) - Date.parse(left.publishedDate),
    );
}

export function getPublishedPost(
  source: readonly Post[],
  slug: string,
): Post | undefined {
  return source.find((post) => post.slug === slug && !post.draft);
}

export function getPostsByAuthor(
  source: readonly Post[],
  authorSlug: string,
): Post[] {
  return getPublishedPosts(source).filter(
    (post) => post.author === authorSlug,
  );
}

export function getPostsByTag(
  source: readonly Post[],
  tagSlug: string,
): Post[] {
  return getPublishedPosts(source).filter((post) =>
    post.tags.includes(tagSlug),
  );
}

export function paginatePosts(
  source: readonly Post[],
  currentPage: number,
  pageSize = POSTS_PER_PAGE,
) {
  const totalPages = Math.max(1, Math.ceil(source.length / pageSize));
  const start = (currentPage - 1) * pageSize;

  return {
    items: source.slice(start, start + pageSize),
    currentPage,
    totalPages,
  };
}
