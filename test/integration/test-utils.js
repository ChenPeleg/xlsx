export const TestUtils = {
  createCell(value, options) {
    /** @type {"empty" | "string" | "number"} */
    let dataType = "number";
    if (isNaN(value)) {
      dataType = "string";
    } else if (!value) {
      dataType = "empty";
    }
    return {
      dataType,
      value,
      style: {},
    };
  },
  buildExampleSheetsData: async (sheetName) => {
    // @ts-ignore
    const createCell = TestUtils.createCell;
    const cell1 = createCell(10);
    const cell2 = createCell(20);
    const cell3 = createCell("Text");

    const cells = [cell1, cell2, cell3];
    const rows = [{ cells }];
    const worksheet = { rows, name: "worksheet1" };

    return { name: sheetName, sheets: [worksheet] };
  },
};
