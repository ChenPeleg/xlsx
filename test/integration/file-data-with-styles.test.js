import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdir, statSync } from "fs";
import { resolve } from "node:path";
import { runApp } from "../../src/core/xlsx-main.js";
import { TestUtils } from "../utils/test-utils.js";
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
XLSX.set_fs(fs);

describe("test xlsx file data with styles", () => {
  it("text cell values are created correctly", async () => {
    const fileName = "test-excel-file";
    const firstCellValue = "first cell value";
    const secondCellValue = 123456;
    const workbookData = TestUtils.buildExampleSheetsData(fileName);
    workbookData.sheets[0].rows[0].cells[0].value = firstCellValue;
    workbookData.sheets[0].rows[0].cells[0].dataType = "string";
    workbookData.sheets[0].rows[0].cells[1].value = secondCellValue;
    workbookData.sheets[0].rows[0].cells[1].dataType = "number";
    await runApp(workbookData, { tempDir: "temp", outDir: "out" });
    const workbook = XLSX.readFile(resolve("out", `${fileName}.xlsx`));
    const worksheet1 = workbook.Sheets["worksheet1"];
    let firstValue = worksheet1.A1.v;
    let secondValue = worksheet1.B1.v;
    assert(firstValue === firstCellValue);
    assert(secondValue === secondCellValue);
  });
});
