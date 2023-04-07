import { IsAlphanumeric, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
