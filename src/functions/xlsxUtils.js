export const columnIndexToLetter = (columnNumber) => {
  let columnLetter = "";
  while (columnNumber > 0) {
    let remainder = (columnNumber - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    columnNumber = Math.floor((columnNumber - remainder) / 26);
  }
  return columnLetter;
};
