export class Cell {
  /** @type {'number' | 'string' | 'empty'} */
  dataType = 'number';
  constructor(value, options) {
    this.value = value;
    if (isNaN(value)) {
      this.dataType = 'string';
    } else if (!value) {
      this.dataType = 'empty';
    }
  }
}
