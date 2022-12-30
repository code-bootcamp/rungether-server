import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Region } from "./entities/region.entity";
import { RegionsService } from "./regions.service";

@Resolver()
export class RegionsResolver {
  constructor(
    private readonly regionsService: RegionsService //
  ) {}

  @Query(() => [Region])
  fetchRegions(): Promise<Region[]> {
    return this.regionsService.findAll();
  }

  @Mutation(() => Region)
  createRegion(
    @Args("region") region: string //
  ): Promise<Region> {
    return this.regionsService.create({ region });
  }
}
