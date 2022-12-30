import { CreateCommentInput } from "../dto/createComment.input";
import { UpdateCommentInput } from "../dto/updateComment.input";
import { Comment } from "../entity/comment.entity";

export interface ICreateCommentInput {
  createCommentInput: CreateCommentInput;
}

export interface ICommentServiceFindOne {
  id: string;
}

export interface ICommentServiceDelete {
  id: string;
}
export interface ICommentServiceUpdate {
  comment: Comment;
  updateCommentInput: UpdateCommentInput;
}
