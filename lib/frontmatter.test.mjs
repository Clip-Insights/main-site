import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { omitUndefined } from "./frontmatter.mjs";

describe("omitUndefined", () => {
  it("retains defined frontmatter values and removes undefined values", () => {
    assert.deepEqual(
      omitUndefined({
        title: "A post",
        bio: undefined,
        draft: false,
        tags: [],
      }),
      {
        title: "A post",
        draft: false,
        tags: [],
      },
    );
  });
});
