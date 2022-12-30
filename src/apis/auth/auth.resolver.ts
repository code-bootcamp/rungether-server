import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { IContext } from "src/commons/type/context";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { Cache } from "cache-manager";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  @Mutation(() => String)
  async login(
    @Args("email") email: string, //
    @Args("password") password: string,
    @Context() context: IContext
  ): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log("===================");
    console.log(context.req);
    console.log("===================");
    //오류 반환
    //이메일 오류
    if (!user) throw new UnprocessableEntityException("이메일을 확인해주세요.");
    //비밀번호 오류
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException("비밀번호를 확인해 주세요.");

    this.authService.setRefreshToken({ user, res: context.res });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: IContext) {
    const refresherToken = context.req.headers.cookie.replace(
      "refreshToken=",
      ""
    );
    const accesserToken = context.req.headers.authorization.replace(
      "Bearer ",
      ""
    );

    try {
      const decoded = jwt.verify(accesserToken, process.env.JWT_ACCESS_KEY);
      const exp = decoded["exp"] - decoded["iat"];
      await this.cacheManager.set(
        `accesserToken:${accesserToken}`,
        "accessToken",
        exp
      );

      const decodedR = jwt.verify(refresherToken, process.env.JWT_REFRESH_KEY);
      const exp1 = decodedR["exp"] - decodedR["iat"];
      await this.cacheManager.set(
        `refresherToken:${refresherToken}`,
        "refresherToken",
        exp1
      );
    } catch (error) {
      throw new UnauthorizedException("유효하지 않은 토큰입니다.");
    }
    return "로그아웃이 완료되었습니다.";
  }
}
