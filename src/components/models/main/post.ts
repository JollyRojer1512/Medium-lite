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
  createTime: Date;
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

  @Column({ type: "datetime", update: false })
  readonly createTime = new Date();

  @Column({ type: "text", length: 100 })
  title!: string;

  @Column({ type: "longtext" })
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
