import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { UserGetOneUsecase } from "./getOne";

export interface UserUsecaseCollection {
  getOne: UserGetOneUsecase;
}

@injectable()
export class UserUsecaseCollectionImpl implements UserUsecaseCollection {
  constructor(
    @inject(Symbols.Api.Usecase.Single.Main.User.GetOne)
    readonly getOne: UserGetOneUsecase
  ) {}
}
