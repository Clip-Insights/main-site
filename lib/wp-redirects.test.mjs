import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getRedirectSourcePath } from "./wp-redirects.mjs";

describe("getRedirectSourcePath", () => {
  it("preserves a WordPress permalink path", () => {
    assert.equal(
      getRedirectSourcePath(
        "https://clipinsights.com/2024/02/03/video-notes/",
        "https://clipinsights.com",
      ),
      "/2024/02/03/video-notes",
    );
  });

  it("returns the root path without a trailing slash", () => {
    assert.equal(
      getRedirectSourcePath("https://clipinsights.com/", "https://clipinsights.com"),
      "/",
    );
  });

  it("rejects links outside the migrated WordPress site", () => {
    assert.throws(
      () =>
        getRedirectSourcePath(
          "https://other.example.com/legacy-post/",
          "https://clipinsights.com",
        ),
      /different origin/,
    );
  });
});
