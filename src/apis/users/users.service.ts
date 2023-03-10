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
      relations: ["image"],
    });
    return user;
  }

  async findAll({ page }): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.image", "image")
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
      throw new NotFoundException("?????? ?????? ?????? ????????? ?????????.");
    } else if (checkNickName)
      throw new NotFoundException("?????? ?????? ?????? ????????? ?????????.");

    if (isValid !== true || !isValid)
      throw new BadRequestException("????????? ???????????? ???????????????.");

    if (createUserInput.password !== createUserInput.cpassword) {
      throw new NotFoundException("??????????????? ???????????? ????????????.");
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
    //   throw new ConflictException("?????? ????????? ????????????.");
    // }

    let userImage = {};

    if (image) {
      userImage = await this.imagesRepository.save({ imgUrl: image });
    }

    const result = await this.usersRepository.save({
      ...findUser,
      ...user,
      image: { ...userImage },
    });

    await this.imagesRepository.delete({ id: findUser.image.id });

    return result;
  }

  async delete({ userId }) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["image"],
    });

    if (!user)
      throw new UnprocessableEntityException(
        "?????? ?????? ????????? ?????? ??? ????????????!"
      );

    const userInfo = await this.usersRepository.save({
      id: userId,
      password: null,
      email: user.email + "(??????)",
      nickname: user.nickname + "(??????)",
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
      throw new Error("????????? ????????? ????????? ????????????.");
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

    const comment = `[rungether] ${nickname}???, ?????? ???????????? ???????????????`;

    this.mailsService.sendTemplateToEmail({ email, authTempleate, comment });

    return "?????? ??????????????? ?????????????????????";
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

    return "??????????????? ??????????????? ?????????????????????.";
  }
}
