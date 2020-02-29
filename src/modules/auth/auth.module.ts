import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get(Configuration.SECRET_KEY_JWT),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    ConfigModule,
    PassportModule.register({ session: false }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
