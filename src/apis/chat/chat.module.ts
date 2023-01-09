import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatGateway } from "src/commons/websocket/chat.gateway";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { ChatLog, ChatLogSchema } from "./schemas/chat.schema";
import { ChatRoom, ChatRoomSchema } from "./schemas/room.schema";
import { ChatUser, ChatUserSchema } from "./schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: ChatLog.name, schema: ChatLogSchema },
      { name: ChatUser.name, schema: ChatUserSchema },
    ]),
  ],
  providers: [ChatResolver, ChatService, ChatGateway],
})
export class ChatModule {}
