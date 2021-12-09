export type UserID = { id: string };

export interface User extends UserID {
  name: string;
  login: string;
  password: string;
}
