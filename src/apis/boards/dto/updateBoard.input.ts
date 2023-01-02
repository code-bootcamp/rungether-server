import { InputType, PartialType } from "@nestjs/graphql";
import { CreateBoradInput } from "./createBoard.input";

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoradInput) {}
