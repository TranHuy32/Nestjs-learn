import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { signInDto } from './dto/signIn.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signUp.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) { }

  async signIn(body: signInDto): Promise<any> {
    const user = await this.userService.getOneByEmail(body.email);
    const check = await this.userService.checkPassword(
      body.password,
      user.password,
    );
    if (!user || !check) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(body: signUpDto): Promise<User> {
    const user = await this.userService.getOneByEmail(body.email);
    if (user) {
      throw new ConflictException();
    }
    body.password = await this.userService.hashPassword(body.password);
    return this.userService.createUser(body);
  }

  // async signUp(body: signUpDto): Promise<any> {
  //     const user = await this.userService.findOne(body.email);
  //     if (user) {
  //         throw new ConflictException();
  //     }
  //     const newUser = await this.userService.createUser(body)
  //     return newUser;

  // }
}
