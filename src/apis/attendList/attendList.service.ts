import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AttendList } from "./entities/attendList.entity";

@Injectable()
export class AttendListService {
  constructor(
    @InjectRepository(AttendList)
    private readonly attendListRepository: Repository<AttendList>
  ) {}

  async create({ userId, boardId }) {
    return await this.attendListRepository.save({
      user: userId,
      board: boardId,
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

    console.log(result);
    return result;
  }
}
