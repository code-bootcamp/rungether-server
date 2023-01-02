import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  userId: string;

  @Field()
  boardId: string;

  @Field(() => String)
  content: string;
}
