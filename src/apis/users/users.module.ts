import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "../Image/entities/image.entity";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Image,
    ]),
  ],

  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
