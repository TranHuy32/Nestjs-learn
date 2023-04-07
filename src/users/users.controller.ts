import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')s
  // login(): any {
  //   return {}
  // }

  // @Get('protected')
  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUser();
  }

  // @Get('protected')
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = this.userService.getOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('create')
  createUsers(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateUsers(@Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
