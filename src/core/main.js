import { resolve } from "path";
import { deleteFilesFromDir, runZipper } from "../utils/file-utils.js";
import { xlsContent } from "../data/xlsxBuilder.js";
import { buildExampleSheetsData } from "../data/buildSheetObject.js";
import { createFileObjectFromSheets } from "../data/createXlsObject.js";
import Excel from "exceljs";
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
  // await deleteFilesFromDir(outDir);
  // await runZipper(workbookObject.name, outDir);
  const workbook = new Excel.Workbook();
  // await workbook.xlsx.readFile("out/workbook.xlsx");
  // await workbook.calcProperties;
  // const worksheet1 = workbook.getWorksheet("worksheet1");

  const path = "out/workbook.xlsx";
  await workbook.xlsx.readFile(resolve("out", "workbook.xlsx"));
  console.log(workbook.worksheets);
  // file.eachSheet((s) => console.log(s));
};
