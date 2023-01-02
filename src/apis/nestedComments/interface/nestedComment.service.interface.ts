import { IContext } from "src/commons/type/context";
import { CreateNestedCommentInput } from "../dto/createNestedComment.input";
import { UpdateNestedCommentInput } from "../dto/updateNestedComment.input";
import { NestedComment } from "../entity/nestedComment.entity";

export interface ICreateNestedCommentInput {
  createNestedCommentInput: CreateNestedCommentInput;
  user: string;
}

export interface INestedCommentServiceFindOne {
  id: string;
}

export interface INestedCommentServiceDelete {
  id: string;
  context: IContext;
}

export interface INestedCommentServiceUpdate {
  user: string;
  nestedCommentId: NestedComment;
  updateNestedCommentInput: UpdateNestedCommentInput;
}
