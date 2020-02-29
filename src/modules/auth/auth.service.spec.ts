import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.stategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUserRegister } from './interfaces/user-register.interface';
import { IUserLogin } from './interfaces/user-login.interface';

describe('AuthService', () => {
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateByJwt', () => {
    const payload: IJwtPayload = { email: '', type: '' };
    expect(service.validateByJwt(payload)).not.toBeNull();
  });

  it('createJwtPayload', () => {
    const payload: IJwtPayload = { email: '', type: '' };
    expect(service.createJwtPayload(payload)).not.toBeNull();
  });

  it('userRegister', () => {
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
      expect(service.userRegister(payload)).not.toBeNull();
  });

  it('hashPassword', () => {
    expect(service.hashPassword('string')).not.toBeNull();
  });

  it('validateUserByPassword', () => {
    const payload: IUserLogin = { email: '', password: 'random-string' };
    expect(service.validateUserByPassword(payload)).not.toBeNull();
  });
});
