import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUserByID(@Param() id: number): Promise<UserEntity> {
    return await this.userService.get(id);
  }

  @Patch('update/:id')
  async updateUser(
    @Param() id: any,
    @Body() payload: any,
  ): Promise<UpdateResult> {
    try {
      return await this.userService.update(id.id, payload);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
