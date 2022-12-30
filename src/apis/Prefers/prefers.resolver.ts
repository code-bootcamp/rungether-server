import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Prefer } from "./entities/prefer.entity";
import { PrefersService } from "./prefers.service";

@Resolver()
export class PrefersResolver {
  constructor(
    private readonly prefersService: PrefersService //
  ) {}

  @Query(() => [Prefer])
  fetchPrefers(): Promise<Prefer[]> {
    return this.prefersService.findAll();
  }

  @Mutation(() => Prefer)
  createPrefer(
    @Args("prefer") prefer: string //
  ): Promise<Prefer> {
    return this.prefersService.create({ prefer });
  }
}
