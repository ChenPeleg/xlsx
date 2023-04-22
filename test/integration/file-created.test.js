// import { expect, jest, test, it, describe } from "@jest/globals";
import { readdir, statSync } from "fs";
import { resolve } from "node:path";
import { runApp } from "../../src/core/main.js";
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
    await runApp(null, { tempDir: "temp", outDir: "out" });
    const files = await getFolderFiles(resolve("out"));
    expect(files.length).toEqual(1);
    expect(files[0].includes(".xlsx")).toEqual(true);

    const stats = statSync(resolve("out", files[0]));
    expect(stats.size > 4000).toEqual(true);
  });
});
