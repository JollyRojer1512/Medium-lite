import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { App } from "../../../components/server/app";
import {
  PostGetOneUsecaseBodyInput,
  PostGetOneUsecaseQueryInput,
} from "../../usecases/main/post/getOne";
import { PostUsecaseCollection } from "../../usecases/main/post/collection";
import { Context } from "../../../components/server/context";
import { PostPresenterCollection } from "../../presenters/main/post/collection";
import { PostGetOnePresenterOutput } from "../../presenters/main/post/getOne";
import { Module } from "../base";
import {
  PostGetAllByUserUsecaseBodyInput,
  PostGetAllByUserUsecaseQueryInput,
} from "../../usecases/main/post/getAllByUser";
import { PostGetManyPresenterOutput } from "../../presenters/main/post/getMany";
import {
  PostCreateOneUsecaseBodyInput,
  PostCreateOneUsecaseParams,
  PostCreateOneUsecaseQueryInput,
} from "../../usecases/main/post/createOne";
import {
  PostGetUsersPerPageUsecaseBodyInput,
  PostGetUsersPerPageUsecaseQueryInput,
} from "../../usecases/main/post/getUsersPerPage";
import {
  PostRateOneUsecaseBodyInput,
  PostRateOneUsecaseParams,
  PostRateOneUsecaseQueryInput,
} from "../../usecases/main/post/rateOne";

@injectable()
export class PostModule implements Module {
  constructor(
    @inject(Symbols.Infrastructure.App) private readonly app: App,
    @inject(Symbols.Api.Usecase.Collection.Main.Post)
    private readonly usecase: PostUsecaseCollection,
    @inject(Symbols.Api.Presenter.Collection.Main.Post)
    private readonly presenter: PostPresenterCollection
  ) {}

  async init(): Promise<void> {
    this.app.addPostHandler({
      name: "/posts",
      params: PostCreateOneUsecaseParams,
      usecase: this.createOne.bind(this),
    });
    this.app.addPostHandler({
      name: "/posts/:postId/rate",
      params: PostRateOneUsecaseParams,
      usecase: this.rateOne.bind(this),
    });
    this.app.addGetHandler({
      name: "/posts/:id",
      usecase: this.getOne.bind(this),
    });
    this.app.addGetHandler({
      name: "/posts/author/:id",
      usecase: this.getAllByUser.bind(this),
    });
    this.app.addGetHandler({
      name: "/posts/author/:authorId/page/:page",
      usecase: this.getUsersPerPage.bind(this),
    });
  }

  private async createOne(
    context: Context<
      PostCreateOneUsecaseBodyInput,
      PostCreateOneUsecaseQueryInput
    >
  ): Promise<PostGetOnePresenterOutput> {
    const result = await this.usecase.createOne.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }

  private async getOne(
    context: Context<PostGetOneUsecaseBodyInput, PostGetOneUsecaseQueryInput>
  ): Promise<PostGetOnePresenterOutput> {
    const result = await this.usecase.getOne.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }

  private async getAllByUser(
    context: Context<
      PostGetAllByUserUsecaseBodyInput,
      PostGetAllByUserUsecaseQueryInput
    >
  ): Promise<PostGetManyPresenterOutput> {
    const result = await this.usecase.getAllByUser.execute(context);
    const output = this.presenter.getMany.format(context, result);
    return output;
  }

  private async getUsersPerPage(
    context: Context<
      PostGetUsersPerPageUsecaseBodyInput,
      PostGetUsersPerPageUsecaseQueryInput
    >
  ): Promise<PostGetManyPresenterOutput> {
    const result = await this.usecase.getUsersPerPage.execute(context);
    const output = this.presenter.getMany.format(context, result);
    return output;
  }

  private async rateOne(
    context: Context<PostRateOneUsecaseBodyInput, PostRateOneUsecaseQueryInput>
  ): Promise<PostGetOnePresenterOutput> {
    const result = await this.usecase.rateOne.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }
}
