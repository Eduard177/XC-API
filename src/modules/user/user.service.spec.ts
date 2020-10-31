import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

describe('UserService', () => {
  let service: UserService ;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     providers: [
       UserService,
     {
       provide: UserRepository,
       useFactory: () => ({
         find: jest.fn(() => []),
         findOne: jest.fn(() => new UserEntity()),
         save: jest.fn(() => true ),
         remove: jest.fn( () => true),
       }),
     },
     ],
    }).compile();

    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an empty array', async () => {
      const users = await service.getAll();
      expect(users.length).toBe(0);
    } );
  });

  describe('get', () => {
    it('should return an user', async () => {
      let user: UserEntity = await service.get(1);
      expect(user).not.toBeNull();

      user = await service.findOneByEmail('test@gmail.com');
      expect(user).not.toBeNull();
    });
  });

  describe('create', () => {
    it('should save a user', async () => {
      const user: UserEntity = new UserEntity();
      user.id = 1;
      user.companyCode = '1';
      user.email = '1';
      user.password = '1';

      const isCreated = await service.create(user);
      expect(isCreated).toBeTruthy();
    });
  });
});
