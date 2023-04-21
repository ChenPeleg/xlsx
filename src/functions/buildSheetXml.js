/**
 * @param {string} cellIndex
 * @param {import("../types/worksheet.types.js").Cell} cell
 * @returns {string}
 */
const buildCell = (cellIndex, cell) => {
  const cellStyle = cell.style?.styleId ? `s="${+cell.style.styleId + 1}"` : "";
  if (cell.dataType === "string") {
    return `<c r="${cellIndex}" ${""} t="inlineStr" >  
    <is><t>${cell.value}</t></is>  
  </c>`;
  }
  return `<c r="${cellIndex}" ${cellStyle} >  
   <v>${cell.value}</v>  
</c>`;
};

/**
 * @param {number} rowIndex
 * @param {import("../types/worksheet.types.js").Row} row
 * @returns {string}
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
 * @param {import("../types/worksheet.types.js").Sheet} worksheet
 * @returns {string}
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
function columnIndexToLetter(columnNumber) {
  let columnLetter = "";
  while (columnNumber > 0) {
    let remainder = (columnNumber - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    columnNumber = Math.floor((columnNumber - remainder) / 26);
  }
  return columnLetter;
}
