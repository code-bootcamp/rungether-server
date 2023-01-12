import { Injectable, OnModuleInit } from "@nestjs/common";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChatService } from "./chat.service";

//@Injectable()
@WebSocketGateway({
  namespace: "chat",
  cors: {
    origin: "*",
    credentials: true,
  },
})
export class ChatGateway implements OnModuleInit {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on("connection", (socket) => {
      console.log(socket.id);
      console.log("Connected");
    });
  }

  @SubscribeMessage("send")
  async sendMessage(@MessageBody() data: any) {
    console.log(data);
    const [room, nickname, message, userId] = data;
    const boardUser = await this.chatService.findBoard({ boardId: room });
    const boardUserId = boardUser.user.id;

    this.server.emit(room, [nickname, userId, message]);

    if (boardUserId! == userId)
      this.server.emit(boardUserId, [nickname, message, userId]);
    await this.chatService.create({ userId: userId, boardId: room, message });
  }
}
