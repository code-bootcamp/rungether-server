import { CreateNestedCommentInput } from "../dto/createNestedComment.input";
import { UpdateNestedCommentInput } from "../dto/updateNestedComment.input";
import { NestedComment } from "../entity/nestedComment.entity";

export interface ICreateNestedCommentInput {
  createNestedCommentInput: CreateNestedCommentInput;
}

export interface INestedCommentServiceFindOne {
  id: string;
}

export interface INestedCommentServiceDelete {
  id: string;
}

export interface INestedCommentServiceUpdate {
  nestedComment: NestedComment;
  updateNestedCommentInput: UpdateNestedCommentInput;
}
