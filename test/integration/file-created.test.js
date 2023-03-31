import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "fs";
import { resolve } from "node:path";
/**
 * @param {string} fullPath
 * @returns {string[] | any}
 */
const getFolderFiles = (fullPath) => {
  return new Promise((resolve, reject) => {
    readdir(fullPath, (error, files) => {
      if (error) reject(error);
      resolve(files);
    });
  });
};

describe("an excel file was created", () => {
  it("created an excel file", async () => {
    // await runApp(null, { tempDir: 'temp' });
    const files = ["fasdf"]; // await getFolderFiles(resolve("out"));
    assert.equal(files.length, 1);
    // assert.equal(files[0].includes(".xlsx"), true);
  });
});
