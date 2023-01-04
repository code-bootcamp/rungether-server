import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReviewBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  reviewImage: string[];
}
