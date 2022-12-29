import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entity/comments.entity";
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
    const { ...comment } = createCommentInput;
    const result = await this.commentRepository.save({
      ...comment,
    });
    return result;
  }

  findOne({ id }: ICommentServiceFindOne) {
    return this.commentRepository.findOne({
      where: { id },
    });
  }

  async delete({ id }: ICommentServiceDelete): Promise<boolean> {
    const result = await this.commentRepository.softDelete({ id });
    return result.affected ? true : false;
  }

  update({ comment, updateCommentInput }): Promise<Comment> {
    const result = this.commentRepository.save({
      ...comment,
      ...updateCommentInput,
    });
    return result;
  }
}
