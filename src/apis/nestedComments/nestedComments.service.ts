import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../comments/entity/comment.entity";
import { User } from "../users/entities/user.entity";
import { NestedComment } from "./entity/nestedComment.entity";
import {
  ICreateNestedCommentInput,
  INestedCommentServiceDelete,
  INestedCommentServiceFindOne,
} from "./interface/nestedComment.service.interface";

@Injectable()
export class NestedCommentsService {
  constructor(
    @InjectRepository(NestedComment)
    private readonly nestedCommentRepository: Repository<NestedComment>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create({ createNestedCommentInput }: ICreateNestedCommentInput) {
    const { commentId, userId, ...nestedComment } = createNestedCommentInput;
    const resultComment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    const resultUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const result = await this.nestedCommentRepository.save({
      user: {
        ...resultUser,
      },
      comment: {
        ...resultComment,
      },
      ...nestedComment,
    });
    return result;
  }

  findOne({ id }: INestedCommentServiceFindOne) {
    return this.nestedCommentRepository.findOne({
      where: { id },
      relations: ["user", "comment"],
    });
  }

  async delete({ id }: INestedCommentServiceDelete): Promise<boolean> {
    const result = await this.nestedCommentRepository.softDelete({ id });
    return result.affected ? true : false;
  }

  update({
    nestedComment,
    updateNestedCommentInput,
    user,
  }): Promise<NestedComment> {
    const result = this.nestedCommentRepository.save({
      ...user,
      ...nestedComment,
      ...updateNestedCommentInput,
    });
    return result;
  }
}
//푸쉬용 업데이트122
