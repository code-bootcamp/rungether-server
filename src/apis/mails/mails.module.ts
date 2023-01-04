import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "../Image/entities/image.entity";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { MailsResolver } from "./mails.resolver";
import { MailsService } from "./mails.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Image,
    ]),
  ],
  providers: [
    MailsResolver, //
    MailsService,
    UsersService,
  ],
})
export class EmailModule {}
