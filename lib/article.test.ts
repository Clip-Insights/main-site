import assert from "node:assert/strict";
import { it } from "node:test";
import { articleHeadings, readingMinutes } from "./article.ts";

it("builds usable contents links from article headings", () => {
  assert.deepEqual(articleHeadings("# Title\n\n## Keep the source\nText\n\n### Detail\n\n## Check before sharing!\n"), [{ title: "Keep the source", id: "keep-the-source" }, { title: "Check before sharing!", id: "check-before-sharing" }]);
});
it("uses a minimum one-minute read and rounds longer articles up", () => {
  assert.equal(readingMinutes(""), 1);
  assert.equal(readingMinutes("word ".repeat(201)), 2);
});
