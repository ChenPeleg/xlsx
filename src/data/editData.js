import { resolve } from "node:path";

import { buildSheetXml } from "../functions/buildSheetXml.js";
import { replaceInFile } from "../utils/replaceInFile.js";
/**
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
  };
};

/**
 * @param {any} data
 * @param {import("../types/config.type.js").XlsConfig} config
 */
export const editData = async (data, config) => {
  const cells = [CellClass(4234), CellClass("I am a text"), CellClass(12)];
  const rows = [{ cells }, { cells }, { cells }];
  const worksheet = { rows, name: "worksheet1" };
  const sheet1 = buildSheetXml(worksheet);
  replaceInFile(
    resolve(config.tempDir, "xl", "worksheets", "sheet1.xml"),
    "<sheetData/>",
    sheet1
  );
  console.log(sheet1);
};
