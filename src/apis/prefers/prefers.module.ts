import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Prefer } from "./entities/prefer.entity";
import { PrefersResolver } from "./prefers.resolver";
import { PrefersService } from "./prefers.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Prefer, //
    ]),
  ],
  providers: [
    PrefersResolver, //
    PrefersService,
  ],
})
export class PrefersModule {}
