import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signIn.dto';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './auth.guard';
import { signUpDto } from './dto/signUp.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  // userService: any;
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async singIn(@Body() body: signInDto): Promise<User> {
    return this.authService.signIn(body);
  }

  @Post('signup')
  async signUp(@Body() body: signUpDto): Promise<User> {
    const user = await this.userService.getOneByEmail(body.email);
    if (user) {
      throw new ConflictException();
    }
    body.password = await this.userService.hashPassword(body.password);
    return this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('Profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
