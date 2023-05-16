import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { UserGetOnePresenter } from "./getOne";

export interface UserPresenterCollection {
  getOne: UserGetOnePresenter;
}

@injectable()
export class UserPresenterCollectionImpl implements UserPresenterCollection {
  constructor(
    @inject(Symbols.Api.Presenter.Single.Main.User.GetOne)
    readonly getOne: UserGetOnePresenter
  ) {}
}
