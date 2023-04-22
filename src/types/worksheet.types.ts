import { CellStyle } from "./style.types.js";

export interface Cell {
    dataType?: "number" | "string" | "empty";
    value: number | string;
    style?: CellStyle;
}
export interface Row {
  cells: Cell[];
  height? : number
}

export interface Sheet {
  rows: Row[];
  name: string;
  columnWidth?: number[] 
}
export interface Workbook {
    name : string;
    sheets : Sheet [];
}
