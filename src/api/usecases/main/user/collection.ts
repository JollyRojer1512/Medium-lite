import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { UserGetOneUsecase } from "./getOne";
import { UserCreateOneUsecase } from "./createOne";
import { UserGetPageUsecase } from "./getPage";
import { UserLoginUsecase } from "./login";

export interface UserUsecaseCollection {
  createOne: UserCreateOneUsecase;
  getOne: UserGetOneUsecase;
  getPage: UserGetPageUsecase;
  login: UserLoginUsecase;
}

@injectable()
export class UserUsecaseCollectionImpl implements UserUsecaseCollection {
  constructor(
    @inject(Symbols.Api.Usecase.Single.Main.User.CreateOne)
    readonly createOne: UserCreateOneUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.User.GetOne)
    readonly getOne: UserGetOneUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.User.GetPage)
    readonly getPage: UserGetPageUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.User.Login)
    readonly login: UserLoginUsecase
  ) {}
}
