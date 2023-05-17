import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { UserGetOnePresenter } from "./getOne";
import { UserGetManyPresenter } from "./getMany";

export interface UserPresenterCollection {
  getOne: UserGetOnePresenter;
  getMany: UserGetManyPresenter;
}

@injectable()
export class UserPresenterCollectionImpl implements UserPresenterCollection {
  constructor(
    @inject(Symbols.Api.Presenter.Single.Main.User.GetOne)
    readonly getOne: UserGetOnePresenter,
    @inject(Symbols.Api.Presenter.Single.Main.User.GetMany)
    readonly getMany: UserGetManyPresenter
  ) {}
}
