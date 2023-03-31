import { Cell } from '../class/cell.js';
import { Row } from '../class/row.js';
import { Workbook } from '../class/workbook.js';
import { Worksheet } from '../class/worksheet.js';
import { buildSheetXml } from '../functions/buildSheetXml.js';
/**
 * @param {any} data
 * @param {import('../types/config.type.js').XlsConfig} config
 */
export const addData = async (data, config) => {
  const cells = [new Cell(4234), new Cell(772), new Cell(12)];
  const rows = [new Row(cells), new Row(cells), new Row(cells)];
  const worksheet = new Worksheet(rows);
  const sheet1 = buildSheetXml(worksheet);
  console.log(sheet1);
};
