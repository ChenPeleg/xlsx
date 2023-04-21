import { resolve } from "path";
import { deleteFilesFromDir, runZipper } from "../utils/file-utils.js";
import { xlsContent } from "../data/xlsxBuilder.js";
import { buildExampleSheetsData } from "../data/buildSheetObject.js";
import { createFileObjectFromSheets } from "../data/createXlsObject.js";

/** @param {{ tempDir: string }} config */
export const runApp = async (data, config) => {
  const tempDir = config?.tempDir || "temp";
  await deleteFilesFromDir(resolve(tempDir));
  /** @type {import("../types/worksheet.types.js").Workbook} */
  const workbookObject = data || (await buildExampleSheetsData());
  const xlsObject = createFileObjectFromSheets(...workbookObject.sheets);
  await xlsContent.copyFilesToTempDir(xlsObject, resolve(tempDir));
  await deleteFilesFromDir("out");
  await runZipper();
};
