import { Injectable } from "@nestjs/common";
import { Args, Mutation, Query } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService //
  ) {}

  @Query(() => String)
  async checkNickName(
    @Args("nickname") nickname: string //
  ) {
    const findNickName = await this.usersService.findNickname({ nickname });
    if (findNickName) {
      return false;
    } else return true;
  }

  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput //
  ) {
    return this.usersService.createUser({ createUserInput });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
