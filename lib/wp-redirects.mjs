export function getRedirectSourcePath(postLink, wordpressBaseUrl) {
  const postUrl = new URL(postLink);
  const wordpressUrl = new URL(wordpressBaseUrl);

  if (postUrl.origin !== wordpressUrl.origin) {
    throw new Error(
      `WordPress post link has a different origin: ${postUrl.origin}`,
    );
  }

  return postUrl.pathname.replace(/\/+$/, "") || "/";
}
