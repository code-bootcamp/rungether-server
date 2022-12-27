import { Injectable } from "@nestjs/common";
import { Args, Mutation, Query } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Injectable()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
