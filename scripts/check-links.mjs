import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3001";
const origin = new URL(base).origin;
const queue = ["/", "/blog?page=2", "/rss.xml", "/sitemap.xml", "/robots.txt", "/sample-notes.pdf", "/opengraph-image"];
const visited = new Map();
const failures = [];
while (queue.length) {
  const route = queue.shift();
  if (visited.has(route)) continue;
  const response = await fetch(new URL(route, base));
  const type = response.headers.get("content-type") ?? "";
  visited.set(route, response.status);
  if (!response.ok) { failures.push(`${route}: ${response.status}`); continue; }
  if (!type.includes("text/html")) continue;
  const html = await response.text();
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  assert.match(html, /<h1[\s>]/, `${route} has no primary heading`);
  assert.match(html, /<title>[^<]+<\/title>/, `${route} has no title`);
  assert.match(html, /name="description"/, `${route} has no description`);
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (href.startsWith("#")) { if (!ids.has(href.slice(1))) failures.push(`${route}: missing anchor ${href}`); continue; }
    const url = new URL(href, new URL(route, base));
    if (url.origin !== origin || url.pathname.startsWith("/_next/") || url.pathname.endsWith(".woff2")) continue;
    const target = `${url.pathname}${url.search}`;
    if (!visited.has(target) && !queue.includes(target)) queue.push(target);
  }
}
const missing = await fetch(new URL("/a-page-that-does-not-exist", base));
assert.equal(missing.status, 404, "Unknown routes must return HTTP 404");
const redirects = await import("../redirects.json", { with: { type: "json" } });
for (const redirect of redirects.default) {
  const response = await fetch(new URL(redirect.source, base), { redirect: "manual" });
  if (response.status !== 308 || response.headers.get("location") !== redirect.destination) failures.push(`Broken migration redirect: ${redirect.source}`);
}
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log(`Passed: ${visited.size} local URLs, page metadata, same-page anchors, 404 and ${redirects.default.length} WordPress redirects.`);
