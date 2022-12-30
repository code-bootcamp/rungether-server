import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  content: string;
}
