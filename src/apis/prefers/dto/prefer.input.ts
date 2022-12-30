import { InputType, OmitType } from "@nestjs/graphql";
import { Prefer } from "../entities/prefer.entity";

@InputType()
export class IPreferInput extends OmitType(
  Prefer, //
  ["prefer"],
  InputType
) {}
