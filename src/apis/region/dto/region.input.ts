import { InputType, OmitType } from "@nestjs/graphql";
import { Region } from "../entities/region.entity";

@InputType()
export class IRegionInput extends OmitType(
  Region, //
  ["region"],
  InputType
) {}
