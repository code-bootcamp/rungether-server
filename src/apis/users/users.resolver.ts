import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Args, Mutation, Query } from "@nestjs/graphql";
import { Cache } from "cache-manager";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  // @Mutation(() => String)
  // checkEmail(
  //   @Args("email") email: string //
  // ) {
  //   const findEmail = this.usersService.findOne({ email });
  //   if (findEmail) {
  //     return false;
  //   }
  //   return true;
  // }

  @Mutation(() => String)
  checkNickName(
    @Args("nickname") nickname: string //
  ) {
    const findNickName = this.usersService.findOne({ nickname });
    if (findNickName) {
      return false;
    }
    return true;
  }

  @Mutation(() => User)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserInput //
  ) {
    const isValid = await this.cacheManager.get(createUserInput.email);
    if (!isValid) throw new Error("인증이 완료되지 않았습니다.");

    const user = await this.usersService.create({ createUserInput });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
