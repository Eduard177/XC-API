import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { not } from 'rxjs/internal-compatibility';

describe('UserService', () => {
  let service: UserService ;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     providers: [
     {
       provide: UserService,
       useFactory: () => ({
         getAll: jest.fn(() => []),
         get: jest.fn(() => new UserEntity()),
         create: jest.fn(() => true ),
         deleteByID: jest.fn( () => true),
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
      const user: UserEntity = await service.get(1);
      expect(user).not.toBeNull();
    });
  });

  describe('create', () => {
    it('should save a user', async () => {
      const user: UserEntity = new UserEntity();
      user.id = 1;
      user.documentNumber = '1';
      user.email = '1';
      user.password = '1';

      const isCreated = await service.create(user);
      expect(isCreated).toBeTruthy();
    });
  });
  describe('deleteByID', () => {
    it('should delete an user by ID', async () => {
      const isDeleted = await service.deleteByID(1);

      expect(isDeleted).toBeTruthy();
    });
  });
});
