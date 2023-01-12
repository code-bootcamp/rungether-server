import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/apis/boards/entities/board.entity";
import { ChatHistory } from "src/apis/chatHistory/entities/chatHistory.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(ChatHistory)
    private readonly chatHistoryRepository: Repository<ChatHistory>
  ) {}

  async create({ userId, boardId, message }) {
    const result: ChatHistory = await this.chatHistoryRepository.save({
      user: { id: userId },
      board: { id: boardId },
      message: message,
    });
    return result;
  }

  async findBoard({ boardId }) {
    const result = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ["user"],
    });
    return result;
  }
}
