import { resolve } from "path";
import { deleteFilesFromDir, runZipper } from "../utils/file-utils.js";
import { xlsContent } from "../data/xlsxBuilder.js";
import { buildExampleSheetsData } from "../data/buildSheetObject.js";
import { createFileObjectFromSheets } from "../data/createXlsObject.js";
import Excel from "exceljs";
import * as XLSX from "xlsx/xlsx.mjs";
import * as fs from "fs";
import { realpathSync } from "node:fs";

/**
 * @param {import("../types/worksheet.types.js").Workbook} data
 * @param {{ tempDir: string; outDir: string }} config
 */
export const runApp = async (data, config) => {
  const tempDir = config?.tempDir || "temp";
  const outDir = config?.outDir || "out";
  await deleteFilesFromDir(resolve(tempDir));
  const workbookObject = data || (await buildExampleSheetsData());
  const xlsObject = createFileObjectFromSheets(workbookObject);
  await xlsContent.copyFilesToTempDir(xlsObject, resolve(tempDir));
  await deleteFilesFromDir(outDir);
  await runZipper(workbookObject.name, outDir);
};
