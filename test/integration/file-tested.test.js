import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdir, statSync } from "fs";
import { resolve } from "node:path";
import { runApp } from "../../src/core/main.js";

describe("an excel file was created", () => {
  it("created an excel file", async () => {
    // await runApp(null, { tempDir: "temp" });
    // const files = await getFolderFiles(resolve("out"));
    // assert.equal(files.length, 1);
    // assert.equal(files[0].includes(".xlsx"), true);
    // const stats = statSync(resolve("out", files[0]));
    // assert.equal(stats.size > 4000, true, "xlsx file too small");
  });
});
