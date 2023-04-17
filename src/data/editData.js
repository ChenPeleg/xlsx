import { resolve } from "node:path";

import { buildSheetXml } from "../functions/buildSheetXml.js";
import { writeFileSync } from "node:fs";
import { xlsContent } from "./xlsxBuilder.js";
import { unlink } from "node:fs/promises";
import { xlsxFiles } from "./xlsxFiles.js";
/**
 * A basic class to describe a worksheet cell
 *
 * @param {any} value
 * @returns {import("../types/worksheet.types.js").Cell}
 */
const CellClass = (value, options) => {
  /** @type {"empty" | "string" | "number"} */
  let dataType = "empty";
  if (isNaN(value)) {
    dataType = "string";
  } else if (!value) {
    dataType = "empty";
  }
  return {
    dataType,
    value,
    style: {},
  };
};

/**
 * @param {any} data
 * @param {import("../types/config.type.js").XlsConfig} config
 */
export const editData = async (data, config) => {
  const cell1 = CellClass(4234);
  const cell2 = CellClass("I am a text");
  cell1.style.background = "red";
  cell2.style.background = "blue";
  const cells = [cell1, cell2, CellClass(12)];
  const rows = [{ cells }, { cells }, { cells }];
  const worksheet = { rows, name: "worksheet1" };

  const sheet1 = buildSheetXml(worksheet);
  const sheet2 = buildSheetXml(worksheet);
  const allSheetsNames = ["sheet1", "my nice sheet"];
  await unlink(resolve(config.tempDir, "xl", "worksheets", "sheet1.xml"));

  writeFileSync(
    resolve(config.tempDir, ...xlsContent.sheetFile(1)),
    xlsxFiles.sheet1.content.replace("<sheetData/>", sheet1),
    "utf8"
  );
  writeFileSync(
    resolve(config.tempDir, ...xlsContent.sheetFile(2)),
    xlsxFiles.sheet1.content.replace("<sheetData/>", sheet2),
    "utf8"
  );
  writeFileSync(
    resolve(config.tempDir, ...xlsxFiles.workbookXml.url),
    xlsContent.buildWorkbookXml(allSheetsNames)
  );

  writeFileSync(
    resolve(config.tempDir, ...xlsxFiles.workbookRels.url),
    xlsContent.buildRelationsXml(allSheetsNames)
  );
};
/**
 * @param {{
 *   rows: {
 *     cells: import("../types/worksheet.types.js").Cell[];
 *   }[];
 *   name: string;
 * }[]} sheets
 */
const createFileObjectFromSheets = (...sheets) => {
  const xmlFilesObject = {
    ...xlsxFiles,
    workbookXml: { ...xlsxFiles.workbookXml },
    workbookRels: { ...xlsxFiles.workbookXml },
  };
  const sheetNames = sheets.map((s) => s.name);

  sheets.forEach((sheet) => {});
};
