import { BadRequestException, Injectable, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { MailsService } from "../mails/mails.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-board.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
    private readonly mailsService: MailsService
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

  @Query(() => User)
  fetchUser(@Args("userId") userId: string) {
    return this.usersService.findUser({ userId });
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
    @Context() context: IContext, //
    @Args("imageId") imageId: string
  ) {
    const userId = context.req.user.id;
    return this.usersService.delete({ userId, imageId });
  }

  @Mutation(() => String)
  findUserPassword(
    @Args("email") email: string //
  ) {
    return this.usersService.findUserPassword({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  updatePassword(
    @Context() context: IContext, //
    @Args("password") password: string,
    @Args("rePassword") rePassword: string
  ) {
    const userId = context.req.user.id;
    if (password !== rePassword)
      throw new BadRequestException("비밀번호를 다시 확인 해 주세요.");

    return this.usersService.updatePassword({ userId, password });
  }
}
