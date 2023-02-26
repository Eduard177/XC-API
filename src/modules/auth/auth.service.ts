import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Configuration } from '../config/config.keys';
import { ConfigService } from '../config/config.service';
import { compareSync, hash } from 'bcrypt';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUserLogin } from './interfaces/user-login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateByJwt(payload: IJwtPayload): Promise<UserEntity> {
    return this.userService.findOneByEmail(payload.email);
  }

  createJwtPayload(data: IJwtPayload) {
    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: this.configService.get(Configuration.TOKEN_EXPIRATION_TIME),
      token: jwt,
    };
  }

  async userRegister(payload: IUserRegister): Promise<object> {
    try {
      const user = await this.userService.findOneByEmail(payload.email);

      if (user) {
        throw new ForbiddenException('USER_EXIST');
      }

      const password = await hash(payload.password, 10);
      return await this.userService.create({
        ...payload,
        password,
      });
    } catch (e) {
      throw e;
    }
  }

  async validateUserByPassword(payload: IUserLogin): Promise<object> {
    const user: UserEntity = await this.userService.findOneByEmail(
      payload.email,
    );

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = compareSync(payload.password, user.password);

    if (isPasswordValid) {
      return {
        jwt: this.createJwtPayload({
          email: user.email,
        }),
        user,
      };
    } else {
      throw new ForbiddenException('WRONG_CREDENTIALS');
    }
  }
}
