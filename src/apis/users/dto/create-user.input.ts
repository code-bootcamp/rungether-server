import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field()
  password: string;

  @Field()
  cpassword: string;

  @Field()
  age: string;

  @Field()
  gender: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field()
  region: string;

  @Field()
  prefer: string;

  @Field()
  grade: string;
}
