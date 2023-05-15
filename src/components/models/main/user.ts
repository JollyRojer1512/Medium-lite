import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TableNames } from "../types";

export interface UserModel {
  id: number;
  create_time: number; // Best with ISODate but typeorm cut off time
  email: string;
  password: string;
}

@Entity({ name: TableNames.users })
export class User implements UserModel {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "integer", update: false })
  readonly create_time = new Date().getTime();

  @Column({ type: "text", length: 20 })
  email!: string;

  @Column({ type: "text", length: 20 })
  password!: string;
}
