import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TableNames } from "../types";
import { Post } from "./post";

export interface UserModel {
  id: number;
  createTime: Date;
  email: string;
  password: string;
}

export type UserPresenter = Omit<UserModel, "createTime" | "password">;

@Entity({ name: TableNames.users })
export class User implements UserModel {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "datetime", update: false })
  readonly createTime = new Date();

  @Column({ type: "text", length: 20, unique: true })
  email!: string;

  @Column({ type: "text", length: 100 })
  salt!: string;
  @Column({ type: "text", length: 200 })
  password!: string;

  @OneToMany((type) => Post, (post) => post.author)
  @JoinColumn()
  posts!: Post[];

  presenter(): UserPresenter {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
