import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { IUsersServiceCreate } from "./interfaces/users-service.interface";
import * as bcrypt from "bcrypt";

@Resolver()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const { email, password, rePassword, ...createUser } = createUserInput;

    const duplicate = await this.usersRepository.findOne({ where: { email } });

    if (duplicate) throw new ConflictException("이미 가입 된 이메일 입니다.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = this.usersRepository.save({
      email,
      password: hashedPassword,
      ...createUser,
    });

    return result;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
