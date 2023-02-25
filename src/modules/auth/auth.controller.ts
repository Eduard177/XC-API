import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IUserLogin } from './interfaces/user-login.interface';
import { AuthService } from './auth.service';
import { IUserRegister } from './interfaces/user-register.interface';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './guards/admin.guard';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async userLogin(@Body() payload: IUserLogin) {
    return this.authService.validateUserByPassword(payload);
  }

  @Post('/register')
  async userRegister(@Body() payload: IUserRegister) {
    return this.authService.userRegister(payload);
  }
}
