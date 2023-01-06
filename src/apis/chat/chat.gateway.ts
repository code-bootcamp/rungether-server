import { Logger } from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3355, {
  transports: ["websocket"],
  namespace: "rungetherChat",
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger("ChatGateway");

  @SubscribeMessage("events")
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
  }
}
