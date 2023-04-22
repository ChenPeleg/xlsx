import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdir, statSync } from "fs";
import { resolve } from "node:path";
import { runApp } from "../../src/core/main.js";
import Excel from "exceljs";
import { TestUtils } from "../integration/test-utils.js";
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
XLSX.set_fs(fs);

describe("an excel file was created 2", () => {
  it("created an excel file", async () => {
    const fileName = "test-excel-file";
    const firstCellValue = "first cell value";
    const workbookData = await TestUtils.buildExampleSheetsData(fileName);
    workbookData.sheets[0].rows[0].cells[0].value = firstCellValue;
    workbookData.sheets[0].rows[0].cells[0].dataType = "string";
    await runApp(workbookData, { tempDir: "temp", outDir: "out" });

    const workbook = await XLSX.readFile("out/test-excel-file.xlsx");
    console.log(workbook);

    const worksheet1 = workbook.Sheets["worksheet1"];
    let w = worksheet1;

    assert.equal(worksheet1, 1, "first cell value is correct");
  });
});
