import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { runApp } from "../../src/core/main.js";
import { TestUtils } from "../utils/test-utils.js";
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
XLSX.set_fs(fs);

describe("test xlsx file data in multiple sheets", () => {
  it("text cell values are created correctly im multiple sheets", async () => {
    const fileName = "test-excel-file";
    const secondSheetAddition = 999;
    const firstCellValue = "first cell value";
    const secondCellValue = 123456;
    const workbookData = TestUtils.buildExampleSheetsData(fileName);

    workbookData.sheets[0].rows[0].cells[0].value = firstCellValue;
    workbookData.sheets[0].rows[0].cells[0].dataType = "string";
    workbookData.sheets[0].rows[0].cells[1].value = secondCellValue;
    workbookData.sheets[0].rows[0].cells[1].dataType = "number";
    // Creating a second sheet
    workbookData.sheets[1] = JSON.parse(JSON.stringify(workbookData.sheets[0]));
    workbookData.sheets[1].name = "worksheet2";
    workbookData.sheets[1].rows[0].cells[0].value =
      workbookData.sheets[1].rows[0].cells[0].value +
      secondSheetAddition.toString();
    workbookData.sheets[1].rows[0].cells[1].value =
      +workbookData.sheets[1].rows[0].cells[1].value + secondSheetAddition;
    await runApp(workbookData, { tempDir: "temp", outDir: "out" });
    const workbook = XLSX.readFile(resolve("out", `${fileName}.xlsx`));
    const worksheet2 = workbook.Sheets["worksheet2"];
    let firstValue = worksheet2.A1.v;
    let secondValue = worksheet2.B1.v;
    assert(firstValue === firstCellValue + secondSheetAddition);
    assert(secondValue === secondCellValue + secondSheetAddition);
  });
});
