import { Request, Response } from "express";

export interface IAuthUserItem {
  email: string;
  exp: number;
}

export interface IUserItem {
  email: string;
}

export interface IUser {
  user?: {
    id: string;
    email: string;
    password: string;
    boardId: string;
  };
}

export interface IContext {
  req: Request & IUser;
  res: Response;
}
