export const TestUtils = {
  /**
   * @param {string | number} value
   * @param {any} options
   * @returns {import("../../src/types/worksheet.types.js").Cell}
   */
  createCell(value, options) {
    return {
      value,
      style: {},
    };
  },
  /**
   * @param {string} sheetName
   * @returns {import("../../src/types/worksheet.types.js").Workbook}
   */
  buildExampleSheetsData: (sheetName = "worksheet") => {
    // @ts-ignore
    const createCell = TestUtils.createCell;
    const cell1 = createCell(10);
    const cell2 = createCell(20);
    const cell3 = createCell("Text");
    const cell4 = createCell(40);
    const cell5 = createCell("Text With style");
    cell4.style.background = "#FF0000";
    cell5.style.font = {
      color: "#FF0000",
    };

    const cells = [cell1, cell2, cell3, cell4, cell5];
    const rows = [{ cells }];
    const worksheet = { rows, name: "worksheet1" };

    return { name: sheetName, sheets: [worksheet] };
  },
};
