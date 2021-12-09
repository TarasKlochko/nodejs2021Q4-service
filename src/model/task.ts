export type TaskID = string;

export interface Task {
  id: TaskID;
  title: string;
  order: number;
  description: string;
  userId: null | string;
  boardId: null | string;
  columnId: null | string;
}
