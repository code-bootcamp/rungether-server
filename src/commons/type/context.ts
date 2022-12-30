export interface IUser {
  user?: {
    email: string;
    password: string;
    id: string;
    boardId: string;
  };
}

export interface IContext {
  req: Request & IUser;
  res: Response;
}
