import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { UserGetOneUsecase } from "./getOne";
import { UserCreateOneUsecase } from "./createOne";

export interface UserUsecaseCollection {
  createOne: UserCreateOneUsecase;
  getOne: UserGetOneUsecase;
}

@injectable()
export class UserUsecaseCollectionImpl implements UserUsecaseCollection {
  constructor(
    @inject(Symbols.Api.Usecase.Single.Main.User.CreateOne)
    readonly createOne: UserCreateOneUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.User.GetOne)
    readonly getOne: UserGetOneUsecase
  ) {}
}
