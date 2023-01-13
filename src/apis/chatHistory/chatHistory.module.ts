import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { ChatHistoryResolver } from "./chatHistory.resolver";
import { ChatHistoryService } from "./chatHistory.service";
import { ChatHistory } from "./entities/chatHistory.entity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Board, ChatHistory, User])],
  providers: [ChatHistoryResolver, ChatHistoryService],
})
export class ChatHistoryModule {}
