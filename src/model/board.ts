export type BoardID = string;
export type Column = {
  id: string;
  title: string;
  order: number;
};
export interface Board {
  id: BoardID;
  title: string;
  columns: Column[];
}
