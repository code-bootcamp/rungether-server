import { Request, Response } from "express";

export interface IAuthUserItem {
  email: string;
  id: string;
  exp: number;
}

export interface IUserItem {
  email: string;
  id: string;
}

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
