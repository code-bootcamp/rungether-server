import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grade } from "./entities/grade.entity";
import { GradesResolver } from "./grades.resolver";
import { GradesService } from "./grades.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Grade, //
    ]),
  ],
  providers: [
    GradesResolver, //
    GradesService,
  ],
})
export class GradesModule {}
