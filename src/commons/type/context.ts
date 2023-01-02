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
    email: string;
    password: string;
    boardId: string;
    id: string;
  };
}

export interface IContext {
  req: Request & IUser;
  res: Response;
}
