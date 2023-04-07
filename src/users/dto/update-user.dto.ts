import { IsAlphanumeric, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateUserDto {
  id: number;
  @IsAlphanumeric()
  @MaxLength(30)
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
