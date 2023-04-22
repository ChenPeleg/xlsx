import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdir, statSync } from "fs";
import { resolve } from "node:path";
import { runApp } from "../../src/core/main.js";
import Excel from "exceljs";
import { TestUtils } from "../integration/test-utils.js";

describe("an excel file was created 2", () => {
  it("created an excel file", async () => {
    const fileName = "test-excel-file";
    const firstCellValue = "first cell value";
    const workbookData = await TestUtils.buildExampleSheetsData(fileName);
    workbookData.sheets[0].rows[0].cells[0].value = firstCellValue;
    await runApp(workbookData, { tempDir: "temp", outDir: "out" });
    var workbook = new Excel.Workbook();
    const file = await workbook.xlsx.readFile("out/test-excel-file.xlsx");

    const worksheet = file.getWorksheet(0);
    const cellValue = worksheet.findCell(1, 1).value;
    assert.equal(cellValue, firstCellValue, "first cell value is correct");
  });
});
