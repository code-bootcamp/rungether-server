import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { User } from "src/apis/users/entities/user.entity";
import { AttendsResolver } from "./attendsLists.resolver";
import { AttendsService } from "./attendsLists.service";
import { AttendList } from "./entities/attendList.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendList, //
      User,
      Board,
    ]),
  ],

  providers: [
    AttendsResolver, //
    AttendsService,
  ],
})
export class AttendsListsModule {}
