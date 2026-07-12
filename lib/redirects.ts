import { existsSync, readFileSync } from "node:fs";

export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

function isLocalPath(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
  );
}

function isRedirect(value: unknown): value is Redirect {
  if (typeof value !== "object" || value === null) return false;

  const redirect = value as Record<string, unknown>;
  return (
    isLocalPath(redirect.source) &&
    isLocalPath(redirect.destination) &&
    typeof redirect.permanent === "boolean"
  );
}

export function loadRedirects(redirectsPath: string): Redirect[] {
  if (!existsSync(redirectsPath)) return [];

  let redirects: unknown;

  try {
    redirects = JSON.parse(readFileSync(redirectsPath, "utf8"));
  } catch {
    throw new Error(`Invalid redirects.json at ${redirectsPath}.`);
  }

  if (!Array.isArray(redirects) || !redirects.every(isRedirect)) {
    throw new Error(
      "redirects.json must contain an array of local source, destination, and permanent redirect entries.",
    );
  }

  return redirects;
}
