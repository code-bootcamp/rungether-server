import { Response } from "express";
import { User } from "src/apis/users/entities/user.entity";
import { IAuthUserItem } from "src/commons/type/context";

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IOAuthUser {
  user: {
    name: string;
    email: string;
    hashedPassword: string;
    address: string;
    phone_number: string;
  };
}
