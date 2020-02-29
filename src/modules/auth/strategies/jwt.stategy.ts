import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '../../config/config.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
// tslint:disable-next-line:no-var-requires
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly configService: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET_KEY_JWT,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authService.validateByJwt(payload);

    if (!user) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }

    return user ;
  }
}
