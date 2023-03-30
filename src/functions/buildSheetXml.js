import { Cell } from '../class/cell.js';
import { Row } from '../class/row.js';
import { Worksheet } from '../class/worksheet.js';

/**
 * @param {string} cellIndex
 * @param {Cell} cell
 * @returns
 */
const buildCell = (cellIndex, cell) => {
  if (cell.dataType === 'string') {
    return `<c r="${cellIndex}" t="inlineStr">  
    <is><t>${cell.value}</t></is>  
  </c>`;
  }
  return `<c r="${cellIndex}">  
   <v>${cell.value}</v>  
</c>`;
};

/**
 * @param {number} index
 * @param {Row} row
 * @returns
 */
const buildRow = (index, row) => {};

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
