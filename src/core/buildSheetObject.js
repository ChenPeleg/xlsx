import { createFileObjectFromSheets } from "../data/createXlsObject.js";

export const buildSheetObject = async () => {
  const cell1 = createCell(10);
  const cell2 = createCell(20);
  const cell3 = createCell(30);
  const cell4 = createCell(0);
  const cell5 = createCell(50);
  // cell1.style.background = "FFFF00"; // yellow
  cell2.style.background = "red"; // gold
  cell2.style.font = { color: "yellow", bold: true, size: 30 }; // gold
  cell3.style.background = "F08080"; //salmon
  cell4.style.background = "00FFFF"; // aqua
  cell4.style.border = ["right", "top", "left"];
  cell3.style.border = ["left", "bottom"];
  // cell5.style.background = "F5DEB3"; //wheat
  const cells = [cell1, cell2, cell3, cell4, cell5];
  const rows = [{ cells }];
  const worksheet = { rows, name: "worksheet1" };

  const worksheet2 = { ...worksheet };
  worksheet2.name = "second";

  return createFileObjectFromSheets(worksheet);
};
/**
 * A basic class to describe a worksheet cell
 *
 * @param {any} value
 * @returns {import("../types/worksheet.types.js").Cell}
 */
function createCell(value, options) {
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
}
