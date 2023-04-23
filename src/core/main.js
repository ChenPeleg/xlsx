import { resolve } from "path";
import { deleteFilesFromDir, runZipper } from "../utils/file-utils.js";
import { xlsContentBuilder } from "../data/xlsContentBuilder.js";
import { createFileObjectFromSheets } from "../data/createXlsObject.js";
import { TestUtils } from "../../test/utils/test-utils.js";

/**
 * @param {import("../types/worksheet.types.js").Workbook} data
 * @param {{ tempDir: string; outDir: string }} config
 */
export const runApp = async (data, config) => {
  const tempDir = config?.tempDir || "temp";
  const outDir = config?.outDir || "out";
  await deleteFilesFromDir(resolve(tempDir));
  const workbookObject = data || TestUtils.buildExampleSheetsData();
  const xlsObject = createFileObjectFromSheets(workbookObject);
  await xlsContentBuilder.copyFilesToTempDir(xlsObject, resolve(tempDir));
  await deleteFilesFromDir(outDir);
  await runZipper(workbookObject.name, outDir);
};
