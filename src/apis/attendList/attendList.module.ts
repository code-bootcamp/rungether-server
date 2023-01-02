import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { AttendListResolver } from "./attendList.resolver";
import { AttendListService } from "./attendList.service";
import { AttendList } from "./entities/attendList.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AttendList, User, Board])],
  providers: [AttendListResolver, AttendListService],
})
export class AttendListModule {}
