import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdir, statSync } from "fs";
import { resolve } from "node:path";
import { runApp } from "../../src/core/main.js";
import Excel from "exceljs";

describe("an excel file was created 2", () => {
  it("created an excel file", async () => {
    const fileName = "test-excel-file";
    await runApp(null, { tempDir: "temp", outDir: "out" });
    var workbook = new Excel.Workbook();
    // const file = await workbook.xlsx.readFile("out/test-excel-file.xlsx");
    // assert.equal(file, 20, "xlsx file too small");
  });
});
