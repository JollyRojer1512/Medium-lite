import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { App } from "../../../components/server/app";
import { UserGetOneUsecaseInput } from "../../usecases/main/user/getOne";
import { UserUsecaseCollection } from "../../usecases/main/user/collection";
import { Context } from "../../../components/server/context";
import { UserPresenterCollection } from "../../presenters/main/user/collection";
import { UserGetOnePresenterOutput } from "../../presenters/main/user/getOne";
import {
  UserCreateOneUsecaseInput,
  UserCreateOneUsecaseParams,
} from "../../usecases/main/user/createOne";
import { Module } from "../base";
import { UserGetManyPresenterOutput } from "../../presenters/main/user/getMany";
import { UserGetPageUsecaseInput } from "../../usecases/main/user/getPage";
import {
  UserLoginUsecaseInput,
  UserLoginUsecaseParams,
} from "../../usecases/main/user/login";

@injectable()
export class UserModule implements Module {
  constructor(
    @inject(Symbols.Infrastructure.App) private readonly app: App,
    @inject(Symbols.Api.Usecase.Collection.Main.User)
    private readonly usecase: UserUsecaseCollection,
    @inject(Symbols.Api.Presenter.Collection.Main.User)
    private readonly presenter: UserPresenterCollection
  ) {}

  async init(): Promise<void> {
    this.app.addPostHandler({
      name: "/authors",
      params: UserCreateOneUsecaseParams,
      usecase: this.createOne.bind(this),
    });
    this.app.addGetHandler({
      name: "/authors/:id",
      usecase: this.getOne.bind(this),
    });
    this.app.addGetHandler({
      name: "/authors/page/:page",
      usecase: this.getPage.bind(this),
    });
    this.app.addPostHandler({
      name: "/users/login",
      params: UserLoginUsecaseParams,
      usecase: this.login.bind(this),
    });
  }

  private async createOne(
    context: Context<UserCreateOneUsecaseInput, undefined>
  ): Promise<UserGetOnePresenterOutput> {
    const result = await this.usecase.createOne.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }

  private async getOne(
    context: Context<undefined, UserGetOneUsecaseInput>
  ): Promise<UserGetOnePresenterOutput> {
    const result = await this.usecase.getOne.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }

  private async getPage(
    context: Context<undefined, UserGetPageUsecaseInput>
  ): Promise<UserGetManyPresenterOutput> {
    const result = await this.usecase.getPage.execute(context);
    const output = this.presenter.getMany.format(context, result);
    return output;
  }

  private async login(
    context: Context<UserLoginUsecaseInput, undefined>
  ): Promise<UserGetOnePresenterOutput> {
    const result = await this.usecase.login.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }
}
