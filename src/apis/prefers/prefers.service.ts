import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Prefer } from "./entities/prefer.entity";
import { IPreferServiceCreate } from "./interfaces/prefers-service.interface";

@Injectable()
export class PrefersService {
  constructor(
    @InjectRepository(Prefer)
    private readonly prefersRepository: Repository<Prefer>
  ) {}

  async findAll(): Promise<Prefer[]> {
    return await this.prefersRepository.find({});
  }

  create({ prefer }: IPreferServiceCreate): Promise<Prefer> {
    const result = this.prefersRepository.save({ prefer });
    return result;
  }
}
