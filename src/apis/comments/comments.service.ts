import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entity/comment.entity";
import {
  ICommentServiceDelete,
  ICommentServiceFindOne,
  ICreateCommentInput,
} from "./interface/comment.service.interface";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create({ createCommentInput }: ICreateCommentInput) {
    const { userId, boardId, ...comment } = createCommentInput;
    const resultUser = await this.commentRepository.findOne({
      where: { id: userId },
    });
    const resultBoard = await this.commentRepository.findOne({
      where: { id: boardId },
    });
    const result = await this.commentRepository.save({
      user: {
        ...resultUser,
      },
      board: {
        ...resultBoard,
      },
      ...comment,
    });
    return result;
  }

  findOne({ id }: ICommentServiceFindOne) {
    return this.commentRepository.findOne({
      where: { id },
      relations: ["user", "board"],
    });
  }

  async delete({ id }: ICommentServiceDelete): Promise<boolean> {
    const result = await this.commentRepository.softDelete({ id });
    return result.affected ? true : false;
  }

  update({ comment, updateCommentInput, user }): Promise<Comment> {
    const result = this.commentRepository.save({
      ...user,
      ...comment,
      ...updateCommentInput,
    });
    return result;
  }
}
