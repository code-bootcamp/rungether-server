import { Response } from "express";
import { User } from "src/apis/users/entities/user.entity";
import { IUserItem } from "src/commons/type/context";

export interface IAuthServiceGetAccessToken {
  user: User | IUserItem;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}
