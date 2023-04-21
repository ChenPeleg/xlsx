

export type CellBorder = 'top' | 'bottom' | 'right' | 'left' | 'all' | {
  position: 'top' | 'bottom' | 'right' | 'left' | 'all';
  width?:  "thin" | "medium" | "thick" | "dotted" | "hair" | "double";
  color? : string
}
export interface CellStyle {
    background?: string; 
    font? : {
      size?: number;
      bold?: boolean;
      color? : string;  
    } 
    border?: CellBorder[];
    styleId?: string;
} 