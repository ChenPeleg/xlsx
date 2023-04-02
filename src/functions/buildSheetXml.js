import { Cell, Row, Workbook, Worksheet } from "../types/worksheet.js";
import { columnIndexToLetter } from "./xlsxUtils.js";

/**
 * @param {string} cellIndex
 * @param {Cell} cell
 * @returns
 */
const buildCell = (cellIndex, cell) => {
  if (cell.dataType === "string") {
    return `<c r="${cellIndex}" t="inlineStr">  
    <is><t>${cell.value}</t></is>  
  </c>`;
  }
  return `<c r="${cellIndex}">  
   <v>${cell.value}</v>  
</c>`;
};

/**
 * @param {number} rowIndex
 * @param {Row} row
 * @returns
 */
const buildRow = (rowIndex, row) => {
  let rowText = `<row r="${rowIndex + 1}" spans="2:12">`;
  row.cells.forEach((c, i) => {
    rowText += buildCell(`${columnIndexToLetter(i + 1)}${rowIndex + 1}`, c);
  });
  rowText += `</row>`;
  return rowText;
};

/**
 * @param {Worksheet} worksheet
 * @returns
 */
export const buildSheetXml = (worksheet) => {
  const rows = worksheet.rows;
  const rowsLength = rows.length || 3;
  const maxColumns = Math.max(...rows.map((r) => r.cells.length)) || 3;
  let sheetText = `<sheetData>`;
  rows.forEach((r, i) => {
    sheetText += buildRow(i, r);
  });
  sheetText += `</sheetData>`;
  return sheetText;
};
