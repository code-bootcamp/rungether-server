import { ConflictException, Injectable } from "@nestjs/common";
import { Args, Mutation, Query } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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

  // @Mutation(() => User)
  // createUser(
  //   @Args("createUserInput") createUserInput: CreateUserInput //
  // ) {
  //   const {} = createUserInput
  // }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
