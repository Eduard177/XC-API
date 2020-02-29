import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { JwtStrategy } from './strategies/jwt.stategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUserLogin } from './interfaces/user-login.interface';

describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;
  const user: UserEntity = {
    cellphone: '',
    companyCode: '',
    email: '',
    fullName: '',
    id: 0,
    imageUrl: '',
    office: '',
    password: '',
    position: '',
    role: '',
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return undefined;
    },
    remove(options?: RemoveOptions): Promise<any> {
      return undefined;
    },
    save(options?: SaveOptions): Promise<any> {
      return undefined;
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: JwtService,
          useFactory: () => ({
            sign: jest.fn(() => 'random-string'),
          }),
        },
        {
          provide: ConfigService,
          useFactory: () => ({
            get: jest.fn(() => 'random-string'),
          }),
        },
        {
          provide: UserService,
          useFactory: () => ({
            findOneByEmail: jest.fn(() => user ),
            create: jest.fn(() => user ),
          }),
        },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('register', () => {
    const payload: IUserRegister = {
      cellphone: '',
      companyCode: '',
      email: '',
      fullName: '',
      imageUrl: '',
      office: '',
      password: 'string',
      position: '',
      role: '',
    };
    expect(controller.userRegister(payload)).not.toBeNull();
  });

  it('login', () => {
    const payload: IUserLogin = { email: '', password: 'random-string' };
    expect(controller.userLogin(payload)).not.toBeNull();
  });
});
