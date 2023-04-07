import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { signInDto } from './dto/signIn.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

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

  // async signUp(body: signUpDto): Promise<any> {
  //     const user = await this.userService.findOne(body.email);
  //     if (user) {
  //         throw new ConflictException();
  //     }
  //     const newUser = await this.userService.createUser(body)
  //     return newUser;

  // }
}
