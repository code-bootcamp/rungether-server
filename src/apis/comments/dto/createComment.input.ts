import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  boardId: string;

  @Field(() => String)
  content: string;
}
