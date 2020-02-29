import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

describe('User Controller', () => {
  let service: UserService ;
  let controller: UserController;

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
      controllers: [UserController],
    }).compile();

    service = module.get(UserService);
    controller = module.get<UserController>(UserController);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return an empty array', async () => {
      const users = await controller.findAllUsers();
      expect(users.length).toBe(0);
    } );
  });

  describe('getUserByID', () => {
    it('should return an user', async () => {
      const user: UserEntity = await controller.getUserByID(1);
      expect(user).not.toBeNull();
    });
  });
});
