export class Workbook {
  constructor(worksheets, name) {
    this.worksheets = worksheets;
    this.name = name || 'worksheet_1';
  }
  worksheets = [];
}
