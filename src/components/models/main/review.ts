import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TableNames } from "../types";
import { Post, PostPresenter } from "./post";
import { User, UserPresenter } from "./user";

export interface ReviewModel {
  id: number;
  createTime: Date;
  user: User;
  post: Post;
  rating: number;
}

export type ReviewPresenter = Omit<
  ReviewModel,
  "createTime" | "user" | "post"
> & { user: UserPresenter; post: PostPresenter };

@Entity({ name: TableNames.reviews })
export class Review implements ReviewModel {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "datetime", update: false })
  readonly createTime = new Date();

  @Column({ type: "int" })
  rating!: number;

  @ManyToOne((type) => Post, (post) => post.reviews)
  @JoinColumn()
  post!: Post;

  @ManyToOne((type) => User, (user) => user.reviews)
  @JoinColumn()
  user!: User;

  presenter(): ReviewPresenter {
    return {
      id: this.id,
      user: this.user.presenter(),
      post: this.post.presenter(),
      rating: this.rating,
    };
  }
}
