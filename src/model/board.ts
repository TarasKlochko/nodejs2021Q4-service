export type BoardID = { id: string };

export interface Board extends BoardID {
  title: string;
  columns: string;
}
