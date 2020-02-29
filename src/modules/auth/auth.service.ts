import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Configuration } from '../config/config.keys';
import { ConfigService } from '../config/config.service';
import * as bcrypt from 'bcrypt';
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

      const password = await this.hashPassword(payload.password);
      return await this.userService.create(
        {
          email: payload.email,
          role: payload.role,
          fullName: payload.fullName,
          office: payload.office,
          companyCode: payload.companyCode,
          imageUrl: payload.imageUrl,
          position: payload.position,
          cellphone: payload.cellphone,
          password,
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async hashPassword(password: string): Promise<object> {
    return new Promise(((resolve, reject) => {
      bcrypt.genSalt(10, async (err, salt) => {
        // tslint:disable-next-line:no-shadowed-variable
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    }));
  }

  async validateUserByPassword(payload: IUserLogin): Promise<object> {
    const user: UserEntity = await this.userService.findOneByEmail(payload.email);

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = new Promise(((resolve, reject) => {
      bcrypt.compare(payload.password, user.password, (err: any, isMatch: any) => {
        if (err) { reject(err); }
        resolve(isMatch);
      });
    }));

    if (isPasswordValid) {
      return {
        jwt: await this.createJwtPayload({
        email: user.email}),
        user,
      };
    } else {
      throw new ForbiddenException('WRONG_CREDENTIALS');
    }
  }
}
