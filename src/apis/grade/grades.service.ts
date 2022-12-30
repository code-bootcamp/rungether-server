import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grade } from "./entities/grade.entity";
import { IRegionsServiceCreate } from "./interfaces/grades-service.interface";

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradesRepository: Repository<Grade>
  ) {}

  async findAll(): Promise<Grade[]> {
    return await this.gradesRepository.find({});
  }

  create({ grade }: IRegionsServiceCreate): Promise<Grade> {
    const result = this.gradesRepository.save({ grade });
    return result;
  }
}
