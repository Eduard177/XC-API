import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { IUserRegister } from '../auth/interfaces/user-register.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(id: number): Promise<UserEntity> {
      if (!id) {
        throw new BadRequestException('id must be sent');
      }
      const user = await this.userRepository.findOne(
        {
          where:{
            id
          }
        });

      if (!user) {
        throw new NotFoundException();
      }
      return user;
  }

  async create(user: IUserRegister): Promise<UserEntity> {
      return await this.userRepository.save(user);
  }

  async getAll(): Promise<UserEntity[]> {
      return await this.userRepository.find();
  }

  async deleteByID(id: number): Promise<void> {
      const user = await this.get(id);
      await user.remove();
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
      return await this.userRepository.findOne(
        {
          where:{
            email
          }
        });
  }
}
