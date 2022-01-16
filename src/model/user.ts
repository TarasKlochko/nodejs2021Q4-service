export type UserID = string;

export interface User {
  id: UserID;
  name: string;
  login: string;
  password: string;
}
