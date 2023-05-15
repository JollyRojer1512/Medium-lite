import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TableNames } from "../types";
import { User } from "./user";

export interface PostModel {
  id: number;
  createTime: number; // Best with ISODate but typeorm cut off time
  title: string;
  content: string;
  author: User;
}

@Entity({ name: TableNames.posts })
export class Post implements PostModel {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "integer", update: false })
  readonly createTime = new Date().getTime();

  @Column({ type: "text", length: 20 })
  title!: string;

  @Column({ type: "text", length: 20 })
  content!: string;

  @OneToOne(() => User)
  @JoinColumn()
  author!: User;
}
