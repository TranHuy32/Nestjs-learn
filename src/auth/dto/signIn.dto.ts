import { MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export class signInDto {
  @Column()
  email: string;

  @MaxLength(10)
  @Column()
  password: string;
}
