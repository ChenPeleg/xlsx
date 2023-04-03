

type CellBorder = 'top' | 'bottom' | 'right' | 'left' | 'all' | {
  position: 'top' | 'bottom' | 'right' | 'left' | 'all';
  width: number;
  color : string
}
export interface CellStyle {
    background?: string;
    color? : string;  
    fontSize?: number ;
    bold?: boolean;
    border?: CellBorder[];
} 