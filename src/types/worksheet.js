export class CellClass {
  /** @type {"number" | "string" | "empty"} */
  dataType = "number";
  constructor(value, options) {
    this.value = value;
    if (isNaN(value)) {
      this.dataType = "string";
    } else if (!value) {
      this.dataType = "empty";
    }
  }
}

export class WorkbookClass {
  constructor(worksheets, name) {
    this.worksheets = worksheets;
    this.name = name || "worksheet_1";
  }
  worksheets = [];
}

export class RowClass {
  cells = [];
  constructor(cells) {
    if (cells) {
      this.cells = cells;
    }
  }
}

export class Worksheet {
  constructor(rows, name) {
    this.rows = rows;
    this.name = name;
  }
  rows = [];
}
