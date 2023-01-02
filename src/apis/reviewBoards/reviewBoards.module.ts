import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendList } from "../attendList/entities/attendList.entity";
import { User } from "../users/entities/user.entity";
import { ReviewBoard } from "./entities/reviewBoard.entity";
import { ReviewBoardsResolver } from "./reviewBoards.resolver";
import { ReviewBoardsService } from "./reviewBoards.service";

@Module({
  imports: [TypeOrmModule.forFeature([ReviewBoard, User, AttendList])],
  providers: [ReviewBoardsResolver, ReviewBoardsService],
})
export class ReviewBoardsModule {}
