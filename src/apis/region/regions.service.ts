import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Region } from "./entities/region.entity";
import { IRegionsServiceCreate } from "./interfaces/regions-service.interface";

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionsRepository: Repository<Region>
  ) {}

  async findAll(): Promise<Region[]> {
    return await this.regionsRepository.find({});
  }

  create({ region }: IRegionsServiceCreate): Promise<Region> {
    const result = this.regionsRepository.save({ region });
    return result;
  }
}
