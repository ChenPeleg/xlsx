import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdir, statSync } from "fs";
import { resolve } from "node:path";
import { runApp } from "../../src/core/main.js";
import { TestUtils } from "../utils/test-utils.js";
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
XLSX.set_fs(fs);

describe("test xlsx file data", () => {
  it("text cell value is created correctly", async () => {
    const fileName = "test-excel-file";
    const firstCellValue = "first cell value";
    const workbookData = await TestUtils.buildExampleSheetsData(fileName);
    workbookData.sheets[0].rows[0].cells[0].value = firstCellValue;
    workbookData.sheets[0].rows[0].cells[0].dataType = "string";
    await runApp(workbookData, { tempDir: "temp", outDir: "out" });
    try {
      const workbook = XLSX.readFile(resolve("out", `${fileName}.xlsx`));
      throw { cause: "a" };
    } catch (err) {
      assert.fail("bad bad bad");
      // throw { cause: "bad bad", message: "this is a message" }; //JSON.stringify(err);
    }
    // const worksheet1 = workbook.Sheets["worksheet1"];
    // let value = worksheet1.A1.v;
  });
});
