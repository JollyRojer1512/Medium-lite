import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TableNames } from "../types";
import { User, UserPresenter } from "./user";

export interface PostModel {
  id: number;
  createTime: number; // Best with ISODate but typeorm cut off time
  title: string;
  content: string;
  author: User;
}

export type PostPresenter = Omit<PostModel, "author"> & {
  author: UserPresenter;
  readTime: number;
};

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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  author!: User;

  private readonly symbolsToReadPerMinute = 100;

  presenter(): PostPresenter {
    return {
      id: this.id,
      createTime: this.createTime,
      content: this.content,
      title: this.title,
      author: this.author.presenter(),
      readTime: Math.ceil(this.content.length / this.symbolsToReadPerMinute),
    };
  }
}
