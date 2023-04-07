import { NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async getAll(): Promise<User[]> {
    return await this
      .find
      // relations: ['pets']
      ();
  }
  public async getOneById(id: number): Promise<User> {
    return await this.findOne(id);
  }
  public async getOneByEmail(email: string): Promise<User> {
    return await this.findOne({ where: { email: email } });
  }
  public async createUser(body: CreateUserDto): Promise<User> {
    const newUser = this.create(body);
    return this.save(newUser);
  }
  public async updateUser(user: User, body: UpdateUserDto): Promise<User> {
    // body.password = await this.hashPassword(body.password);
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    return this.save(user);
  }
  public async deleteUser(id: number): Promise<boolean> {
    const user = await this.getOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.remove(user);
    return true;
  }
}
