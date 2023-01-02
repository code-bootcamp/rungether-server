import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { AttendList } from "./entities/attendList.entity";

@Injectable()
export class AttendListService {
  constructor(
    @InjectRepository(AttendList)
    private readonly attendListRepository: Repository<AttendList>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  async create({ user, board }) {
    return await this.attendListRepository.save({
      user,
      board,
    });
  }

  async findUserList({ userId, boardId }) {
    return await this.attendListRepository.find({
      where: {
        board: { id: boardId },
        user: { id: userId },
      },
    });
  }

  async findOne(type) {
    const result = await this.attendListRepository.findOne({
      where: type,
      relations: ["user", "board"],
    });
    return result;
  }
}
