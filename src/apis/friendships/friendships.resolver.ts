import { Query, Resolver } from "@nestjs/graphql";
import { FriendshipsService } from "./friendships.service";

@Resolver()
export class FriendshipsResolver {
  constructor(
    private readonly friendshipsService: FriendshipsService //
  ) {}
}
