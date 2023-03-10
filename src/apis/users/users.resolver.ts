import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
  UseGuards,
} from "@nestjs/common";
import { Args, Context, Int, Mutation, Query } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { BoardsService } from "../boards/boards.service";
import { MailsService } from "../mails/mails.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-board.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
    private readonly mailsService: MailsService,
    private readonly boardsService: BoardsService
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
  fetchUsers(
    @Args({ name: "page", type: () => Int, defaultValue: 1 }) page: number
  ): Promise<User[]> {
    return this.usersService.findAll({ page });
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
  async deleteUser(
    @Context() context: IContext //
  ) {
    const userId = context.req.user.id;

    if (await this.hasBoard(userId)) {
      throw new UnprocessableEntityException(
        "?????? ?????? ?????? ????????? ???????????? ??????????????????."
      );
    }
    return await this.usersService.delete({ userId });
  }

  async hasBoard(userId) {
    const result = await this.boardsService.findAllMyUserId(userId);
    if (!result || result?.length === 0) return false;

    return true;
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
      throw new BadRequestException("??????????????? ?????? ?????? ??? ?????????.");

    return this.usersService.updatePassword({ userId, password });
  }
}
