import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Region } from "./entities/region.entity";
import { RegionsResolver } from "./regions.resolver";
import { RegionsService } from "./regions.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Region, //
    ]),
  ],
  providers: [
    RegionsResolver, //
    RegionsService,
  ],
})
export class RegionsModule {}
