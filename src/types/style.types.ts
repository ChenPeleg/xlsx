

type CellBorder = 'top' | 'bottom' | 'right' | 'left' | 'all' | {
  position: 'top' | 'bottom' | 'right' | 'left' | 'all';
  width: number;
  color : string
}
export interface CellStyle {
    background?: string;
    color? : string;  
    font? : {
      size?: number;
      bold?: boolean;
      color? : string;  
    } 
    border?: CellBorder[];
    styleId?: string;
} 