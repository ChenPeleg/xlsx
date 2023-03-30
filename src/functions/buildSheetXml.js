import { Worksheet } from '../class/worksheet.js';

const buildCell = (row, index, cell) => {};

/**
 * @param {Worksheet} worksheet
 * @returns
 */
export const buildSheetXml = (worksheet) => {
  const rows = worksheet.rows;
  const rowsLength = rows.length || 3;
  const maxColumns = Math.max(...rows.map((r) => r.cells.length)) || 3;

  return '';
};
