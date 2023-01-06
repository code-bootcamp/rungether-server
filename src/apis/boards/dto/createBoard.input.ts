import { Field, InputType, Int } from "@nestjs/graphql";
import { LocationInput } from "src/apis/location/dto/location.input";

@InputType()
export class CreateBoardInput {
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

  @Field(() => Int)
  recruitPeople: number;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => LocationInput)
  location: LocationInput;
}
