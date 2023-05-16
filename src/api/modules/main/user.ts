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

@injectable()
export class UserModule {
  constructor(
    @inject(Symbols.Infrastructure.App) private readonly app: App,
    @inject(Symbols.Api.Usecase.Collection.Main.User)
    private readonly usecase: UserUsecaseCollection,
    @inject(Symbols.Api.Presenter.Collection.Main.User)
    private readonly presenter: UserPresenterCollection
  ) {}

  async init(): Promise<void> {
    this.app.addGetHandler({
      name: "/users/:id",
      usecase: this.getOne.bind(this),
    });
    this.app.addPostHandler({
      name: "/users",
      params: UserCreateOneUsecaseParams,
      usecase: this.createOne.bind(this),
    });
  }

  private async getOne(
    context: Context<undefined, UserGetOneUsecaseInput>
  ): Promise<UserGetOnePresenterOutput> {
    const result = await this.usecase.getOne.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }

  private async createOne(
    context: Context<UserCreateOneUsecaseInput, undefined>
  ): Promise<UserGetOnePresenterOutput> {
    const result = await this.usecase.createOne.execute(context);
    const output = this.presenter.getOne.format(context, result);
    return output;
  }
}
