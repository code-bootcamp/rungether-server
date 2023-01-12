import { Args, Query, Resolver } from "@nestjs/graphql";
import { ChatHistoryService } from "./chatHistory.service";
import { ChatHistory } from "./entities/chatHistory.entity";

@Resolver()
export class ChatHistoryResolver {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Query(() => [ChatHistory])
  async fetchChatHistory(@Args("boardId") boardId: string) {
    return await this.chatHistoryService.findAll({ boardId });
  }
}
