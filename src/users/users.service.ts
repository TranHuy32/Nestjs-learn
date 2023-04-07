import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<any> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  public async getUser() {
    try {
      return await this.usersRepository.getAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async getOneById(id: number) {
    try {
      const UserId = await this.usersRepository.getOneById(id);
      if (!UserId) {
        throw new NotFoundException('User not found');
      }
      return UserId;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async getOneByEmail(email: string) {
    try {
      const user = await this.usersRepository.getOneByEmail(email);
    //   if (!user) {
    //     throw new NotFoundException('User not found');
    //   }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async createUser(body: CreateUserDto) {
    try {
      return await this.usersRepository.createUser(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateUser(body: UpdateUserDto) {
    const user = await this.usersRepository.getOneById(body.id);
    try {
      if (!user) {
        throw new NotFoundException();
      }
      body.password = await this.hashPassword(body.password);
      return await this.usersRepository.updateUser(user, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async deleteUser(id: number) {
    try {
      return await this.usersRepository.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
