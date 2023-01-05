import { Injectable, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-board.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService //
  ) {}

  @Mutation(() => String)
  async checkNickName(
    @Args("nickname") nickname: string //
  ) {
    const findNickName = await this.usersService.findOne({ nickname });
    if (findNickName) {
      return false;
    } else return true;
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchUserLoggedIn(
    @Context() context: IContext //
  ) {
    const userId = context.req.user.id;
    return this.usersService.findMe({ userId });
  }

  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput //
  ) {
    return this.usersService.createUser({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @Context() context: IContext, //
    @Args("updateUserInput") updateUserInput: UpdateUserInput
  ) {
    const userId = context.req.user.id;

    return this.usersService.update({ userId, updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteUser(
    @Context() context: IContext //
  ) {
    const userId = context.req.user.id;
    return this.usersService.delete({ userId });
  }

  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => String)
  // tempPassword(@Context() context: IContext) {}
}
