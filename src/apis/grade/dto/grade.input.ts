import { InputType, OmitType } from "@nestjs/graphql";
import { Grade } from "../entities/grade.entity";

@InputType()
export class IRegionInput extends OmitType(
  Grade, //
  ["grade"],
  InputType
) {}
