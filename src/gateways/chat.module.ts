import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { ChatHistory } from "src/apis/chatHistory/entities/chatHistory.entity";
import { User } from "src/apis/users/entities/user.entity";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";

@Module({
  imports: [TypeOrmModule.forFeature([ChatHistory, Board, User])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
