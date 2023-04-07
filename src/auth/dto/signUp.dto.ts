import { MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export class signUpDto {
  @Column()
  name: string;

  @Column()
  email: string;

  @MaxLength(10)
  @Column()
  password: string;
}
