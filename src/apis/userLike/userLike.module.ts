import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { UserLike } from "./entities/userLike.entity";
import { UserLikeResolver } from "./userLike.resolver";
import { UserLikeService } from "./userLike.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserLike])],
  providers: [UserLikeResolver, UserLikeService],
})
export class UserLikeModule {}
