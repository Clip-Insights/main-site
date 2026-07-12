import assert from "node:assert/strict";
import {
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";

import { loadRedirects } from "./redirects.ts";

describe("loadRedirects", () => {
  it("returns an empty list when no migration map exists", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "clip-insights-"));

    try {
      assert.deepEqual(loadRedirects(path.join(directory, "redirects.json")), []);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("loads valid migration redirect entries", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "clip-insights-"));
    const redirectsPath = path.join(directory, "redirects.json");

    try {
      writeFileSync(
        redirectsPath,
        JSON.stringify([
          {
            source: "/2024/02/03/video-notes",
            destination: "/blog/video-notes",
            permanent: true,
          },
        ]),
      );

      assert.deepEqual(loadRedirects(redirectsPath), [
        {
          source: "/2024/02/03/video-notes",
          destination: "/blog/video-notes",
          permanent: true,
        },
      ]);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("rejects malformed or invalid redirect maps", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "clip-insights-"));
    const redirectsPath = path.join(directory, "redirects.json");

    try {
      writeFileSync(redirectsPath, "{");
      assert.throws(() => loadRedirects(redirectsPath), /Invalid redirects\.json/);

      writeFileSync(
        redirectsPath,
        JSON.stringify([
          { source: "wordpress-post", destination: "/blog/post", permanent: true },
        ]),
      );
      assert.throws(() => loadRedirects(redirectsPath), /must contain an array/);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
