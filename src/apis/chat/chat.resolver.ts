import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { ChatService } from "./chat.service";
import { ChatRoom } from "./schemas/room.schema";
import * as uuid from "uuid";

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [ChatRoom])
  fetchMyRoomInfo(@Context() context: IContext) {
    const userId = context.req.user.id;
    return this.chatService.fetchMyRoom({ userId });
  }

  @Query(() => [ChatRoom])
  fetchRooms() {
    return this.chatService.fetchRooms();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => [ChatRoom])
  makeRoom(
    @Context() context: IContext //
  ) {
    const userId = context.req.user.id;
    return this.chatService.fetchMyRoom({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ChatRoom)
  createRoom(@Context() context: IContext, @Args("roomName") roomName: string) {
    const roomId = uuid.v4();
    const userId = context.req.user.id;
    const userName = context.req.user.email;
    return this.chatService.createRoom({
      roomId,
      userId,
      roomName,
      userName,
    });
  }
}
