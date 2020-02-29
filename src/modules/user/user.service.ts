import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async get(id: number): Promise<UserEntity> {
    try {
      if (!id) {
        throw new BadRequestException('id must be sent');
      }
      const user = await this.userRepository.findOne(id);

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  async create(user): Promise<UserEntity> {
    try {
      return await this.userRepository.save(user);
    } catch (e) {
      throw e;
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async deleteByID(id: number): Promise<void> {
    try {
      const user = await this.get(id);
      await user.remove();
    } catch (e) {
      throw e;
    }
  }
}
