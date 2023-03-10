import { CanActivate, Injectable } from "@nestjs/common";
import * as Jwt from "jsonwebtoken";

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(context: any): boolean {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(" ")[1];
    try {
      const decode = Jwt.verify(bearerToken, process.env.JWT_ACCESS_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
}
