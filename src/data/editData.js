import { resolve } from "node:path";

import { buildSheetXml } from "../functions/buildSheetXml.js";
import { replaceInFile } from "../utils/replaceInFile.js";
import { writeFile, writeFileSync } from "node:fs";
import { deleteFilesFromDir } from "../cmd/deleteFiles.js";
import { xlsContent } from "./xlsxBuilder.js";
import { unlink } from "node:fs/promises";
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
    xlsContent.sheet.replace("<sheetData/>", sheet1),
    "utf8"
  );
  writeFileSync(
    resolve(config.tempDir, ...xlsContent.sheetFile(2)),
    xlsContent.sheet.replace("<sheetData/>", sheet2),
    "utf8"
  );
  writeFileSync(
    resolve(config.tempDir, ...xlsContent.workbookFile),
    xlsContent.buildWorkbookXml(allSheetsNames)
  );

  writeFileSync(
    resolve(config.tempDir, ...xlsContent.relationsFileFile),
    xlsContent.buildRelationsXml(allSheetsNames)
  );
};
