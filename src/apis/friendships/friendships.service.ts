import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Friendship } from "./entities/friendship.entity";

@Injectable()
export class FriendshipsService {
  constructor(
    @InjectRepository(Friendship)
    private readonly friendshipsRepository: Repository<Friendship>
  ) {}

  countFriendship() {}
}
