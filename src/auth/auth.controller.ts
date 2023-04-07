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

@Controller('auth')
export class AuthController {
  // userService: any;
  constructor(
    private authService: AuthService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async singIn(@Body() body: signInDto): Promise<User> {
    return this.authService.signIn(body);
  }

  @Post('signup')
  async signUp(@Body() body: signUpDto): Promise<User> {
    return this.authService.signUp(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('Profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
