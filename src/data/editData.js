import { resolve } from 'node:path';
import { Cell } from '../class/cell.js';
import { Row } from '../class/row.js';
import { Workbook } from '../class/workbook.js';
import { Worksheet } from '../class/worksheet.js';
import { buildSheetXml } from '../functions/buildSheetXml.js';
import { replaceInFile } from '../utils/replaceInFile.js';
/**
 * @param {any} data
 * @param {import('../types/config.type.js').XlsConfig} config
 */
export const editData = async (data, config) => {
  const cells = [new Cell(4234), new Cell(772), new Cell(12)];
  const rows = [new Row(cells), new Row(cells), new Row(cells)];
  const worksheet = new Worksheet(rows);
  const sheet1 = buildSheetXml(worksheet);
  replaceInFile(
    resolve(config.tempDir, 'worksheets', 'sheet1.xml'),
    '<sheetData></sheetData>',
    sheet1
  );
  console.log(sheet1);
};
