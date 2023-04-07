// import { Pet } from "src/pets/pet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  // body: any;
  @Column()
  email: string;

  @Column()
  password: string;

  // @OneToMany(type => Pet, pet => pet.owner)
  // pets: Pet[];
}
