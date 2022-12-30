import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Prefer } from "../Prefers/entities/prefer.entity";
import { Region } from "../Region/entities/region.entity";
import { User } from "../Users/entities/user.entity";
import { BoardsResolver } from "./board.resolver";
import { BoardsService } from "./board.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Prefer,
      Region,
    ]),
  ],

  providers: [BoardsResolver, BoardsService],
})
export class BoardModule {}
