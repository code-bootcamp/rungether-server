import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { Cache } from "cache-manager";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  async findOne(type) {
    return await this.usersRepository.findOne({
      where: type,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findNickname({ nickname }) {
    return await this.usersRepository.findOne({ where: { nickname } });
  }

  async createUser({ createUserInput }) {
    const { email, password, ...user } = createUserInput;

    const isValid = await this.cacheManager.get(email);

    if (!isValid) throw new BadRequestException("인증이 완료되지 않았습니다.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });

    return result;
  }
}
