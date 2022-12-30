import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateBoradInput {
  title: string;

  content: string;
}
