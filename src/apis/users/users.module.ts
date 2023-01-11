import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsService } from "../boards/boards.service";
import { Board } from "../boards/entities/board.entity";
import { FollowCount } from "../followCounts/followCount.entity";
import { Image } from "../Image/entities/image.entity";
import { Location } from "../location/entities/location.entity";
import { MailsService } from "../mails/mails.service";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Image,
      Board,
      Location,
      FollowCount,
    ]),
  ],

  providers: [UsersResolver, UsersService, MailsService, BoardsService],
})
export class UsersModule {}
