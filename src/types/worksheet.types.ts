export interface Cell {
    dataType: "number" | "string" | "empty";
    value: number | string;
    style?: any;
}
export interface Row {
  cells: Cell[];
}

export interface Sheet {
  rows: Row[];
  name: string;
}
export interface Workbook {
    name : string;
    sheets : Sheet [];
}
