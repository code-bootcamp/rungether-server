import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  nickName: string;

  @Field()
  password: string;

  @Field()
  age: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  profileUrl: string;

  @Field()
  regionId: string;

  @Field()
  preferId: string;

  @Field()
  gradeId: string;
}
