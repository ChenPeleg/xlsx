export interface Row {
  cells: Cell[];
}
export interface Cell {
  dateType: "number" | "string" | "empty";
  value: number | string;
  style?: any;
}
export interface Sheet {
  rows: Row[];
  name: string;
}
export interface Workbook {}
