import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Grade } from "./entities/grade.entity";
import { GradesService } from "./grades.service";

@Resolver()
export class GradesResolver {
  constructor(
    private readonly gradesService: GradesService //
  ) {}

  @Query(() => [Grade])
  fetchGrades(): Promise<Grade[]> {
    return this.gradesService.findAll();
  }

  @Mutation(() => Grade)
  createGrade(
    @Args("grade") grade: string //
  ): Promise<Grade> {
    return this.gradesService.create({ grade });
  }
}
