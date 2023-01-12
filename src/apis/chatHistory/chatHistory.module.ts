import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { ChatHistoryResolver } from "./chatHistory.resolver";
import { ChatHistoryService } from "./chatHistory.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  providers: [ChatHistoryResolver, ChatHistoryService],
})
export class ChatHistoryModule {}
