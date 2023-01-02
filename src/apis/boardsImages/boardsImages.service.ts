import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardImage } from "./entities/boardImage.entity";

@Injectable()
export class BoardsImagesService {
  constructor(
    @InjectRepository(BoardImage)
    private readonly boardsImagesRepository: Repository<BoardImage>
  ) {}

  async find({ boardId }) {
    return await this.boardsImagesRepository.find({
      where: { board: { id: boardId } },
    });
  }

  async findAll() {
    return await this.boardsImagesRepository.find({});
  }

  async upload({ imgUrl, boardId }) {
    this.delete({ boardId });

    for (let i = 0; i < imgUrl.length; i++) {
      await this.boardsImagesRepository.save({
        imgUrl: imgUrl[i],
        isMain: i === 0 ? true : false,
        board: { id: boardId },
      });
    }
    return await this.find({ boardId });
  }

  delete({ boardId }) {
    return this.boardsImagesRepository.delete({ board: boardId });
  }
}
