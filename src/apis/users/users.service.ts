import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { Cache } from "cache-manager";
import { Image } from "../Image/entities/image.entity";
import { FollowCount } from "../followCounts/followCount.entity";
import { MailsService } from "../mails/mails.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly mailsService: MailsService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,

    @InjectRepository(FollowCount)
    private readonly followCountRepository: Repository<FollowCount>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  async findOne(type) {
    return await this.usersRepository.findOne({
      where: type,
    });
  }

  async findUser({ userId }) {
    return await this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async findMe({ userId }) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  async findAll({ page }): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder("user")
      .where("user.password is not null")
      .orderBy("user.createdAt", "DESC")
      .skip((page - 1) * 8)
      .take(8)
      .getMany();
  }

  async createUser({ createUserInput }) {
    const { email, password, cpassword, nickname, image, ...user } =
      createUserInput;

    const isValid = await this.cacheManager.get(createUserInput.email);
    const checkNickName = await this.usersRepository.findOne({
      where: { nickname },
    });
    const checkEmail = await this.usersRepository.findOne({ where: { email } });
    if (checkEmail) {
      throw new NotFoundException("이미 사용 중인 이메일 입니다.");
    } else if (checkNickName)
      throw new NotFoundException("이미 사용 중인 닉네임 입니다.");

    if (isValid !== true || !isValid)
      throw new BadRequestException("인증이 완료되지 않았습니다.");

    if (createUserInput.password !== createUserInput.cpassword) {
      throw new NotFoundException("비밀번호가 일치하지 않습니다.");
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    let userImage = null;

    if (image) {
      userImage = await this.imagesRepository.save({
        imgUrl: image,
      });
    }

    const result = await this.usersRepository.save({
      ...createUserInput,
      image: userImage,
      password: hashedPassword,
    });

    const findUser = await this.usersRepository.findOne({
      where: { email },
    });

    this.followCountRepository.save({
      user: findUser,
    });

    return result;
  }

  async update({ userId, updateUserInput }) {
    const { image, ...user } = updateUserInput;

    const findUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["image"],
    });

    // if (userId !== findUser.id) {
    //   throw new ConflictException("수정 권한이 없습니다.");
    // }

    let userImage = {};

    if (image) {
      await this.imagesRepository.softDelete({ id: findUser.image.id });
      userImage = await this.imagesRepository.save({ imgUrl: image });
    }

    return await this.usersRepository.save({
      ...findUser,
      ...user,
      image: { ...userImage },
    });
  }

  async delete({ userId }) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["image"],
    });

    if (!user)
      throw new UnprocessableEntityException(
        "해당 유저 정보를 찾을 수 없습니다!"
      );

    const userInfo = await this.usersRepository.save({
      id: userId,
      password: null,
      email: user.email + "(탈퇴)",
      nickname: user.nickname + "(탈퇴)",
      age: null,
      gender: null,
      region: null,
      prefer: null,
      grade: null,
      image: null,
    });

    await this.imagesRepository.delete({ id: user.image.id });

    if (userInfo) return true;
    else return false;
  }

  async findUserPassword({ email }) {
    const findUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (findUser.email !== email) {
      throw new Error("가입된 이메일 주소가 없습니다.");
    }

    const nickname = findUser.nickname;

    // const userNickname = await this.usersRepository.findOne({
    //   where: { e },
    // });

    const randomPw = Math.random()
      .toString(30)
      .substring(2, 8)
      .padStart(8, "a1");

    const hashPw = await bcrypt.hash(randomPw, 10);

    this.usersRepository.update({ email: email }, { password: hashPw });

    const authTempleate = await this.mailsService.getPasswordTemplate({
      nickname,
      randomPw,
    });

    const comment = `[rungether] ${nickname}님, 임시 비밀번호 안내입니다`;

    this.mailsService.sendTemplateToEmail({ email, authTempleate, comment });

    return "임시 비밀번호가 전송되었습니다";
  }

  async updatePassword({ userId, password }) {
    const hashedPw = await bcrypt.hash(password, 10);
    const changePw = await this.usersRepository.findOne({
      where: { id: userId },
    });

    await this.usersRepository.save({
      ...changePw,
      password: hashedPw,
    });

    return "비밀번호가 정상적으로 변경되었습니다.";
  }
}
