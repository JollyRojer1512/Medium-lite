import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { App } from "../../../components/server/app";
import {
  UserGetOneUsecaseInput,
  UserGetOneUsecaseInputParams,
  UserGetOneUsecaseOutput,
} from "../../usecases/main/user/getOne";
import { UserUsecaseCollection } from "../../usecases/main/user/collection";
import { Context } from "../../../components/server/context";

@injectable()
export class UserModule {
  constructor(
    @inject(Symbols.Infrastructure.App) private readonly app: App,
    @inject(Symbols.Api.Usecase.Collection.Main.User)
    private readonly usecase: UserUsecaseCollection
  ) {
    this.app.addGetHandler({
      name: "/users/:id",
      params: UserGetOneUsecaseInputParams,
      usecase: this.getOne.bind(this),
    });
  }

  private async getOne(
    context: Context<UserGetOneUsecaseInput>
  ): Promise<UserGetOneUsecaseOutput> {
    const result = await this.usecase.getOne.execute(context);
    return result;
  }
}
