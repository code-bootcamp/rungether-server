import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Pick } from "./entities/pick.entity";
import { PicksResolver } from "./picks.resolver";
import { PicksService } from "./picks.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pick, //
      User,
      Board,
    ]),
  ],

  providers: [
    PicksResolver, //
    PicksService,
  ],
})
export class PicksModule {}
