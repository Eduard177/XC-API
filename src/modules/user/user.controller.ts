import { Controller, Get, Param } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUserByID(@Param() id: number): Promise<UserEntity> {
    return await this.userService.get(id);
  }
}
