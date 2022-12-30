import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/apis/Boards/entities/board.entity";
import { User } from "src/apis/Users/entities/user.entity";
import { AttendsResolver } from "./attends.resolver";
import { AttendsService } from "./attends.service";
import { Attend } from "./entities/attend.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attend, //
      User,
      Board,
    ]),
  ],

  providers: [
    AttendsResolver, //
    AttendsService,
  ],
})
export class AttendsModule {}
