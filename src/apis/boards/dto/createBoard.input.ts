import { Field, InputType, Int } from "@nestjs/graphql";
import { ImageInput } from "src/apis/Image/dto/image.input";

@InputType()
export class CreateBoradInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  appointment: string;

  @Field(() => String)
  recruitRegion: string;

  @Field(() => String)
  recruitGrade: string;

  @Field(() => String)
  recruitSports: string;

  @Field(() => String, { nullable: true })
  image: string;
}
