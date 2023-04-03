import { resolve } from "node:path";
import {
  CellClass,
  RowClass,
  WorkbookClass,
  Worksheet,
} from "../types/worksheet.js";

import { buildSheetXml } from "../functions/buildSheetXml.js";
import { replaceInFile } from "../utils/replaceInFile.js";
/**
 * @param {any} data
 * @param {import("../types/config.type.js").XlsConfig} config
 */
export const editData = async (data, config) => {
  const cells = [
    new CellClass(4234),
    new CellClass("I am a text"),
    new CellClass(12),
  ];
  const rows = [new RowClass(cells), new RowClass(cells), new RowClass(cells)];
  const worksheet = new Worksheet(rows);
  const sheet1 = buildSheetXml(worksheet);
  replaceInFile(
    resolve(config.tempDir, "xl", "worksheets", "sheet1.xml"),
    "<sheetData></sheetData>",
    sheet1
  );
  console.log(sheet1);
};
