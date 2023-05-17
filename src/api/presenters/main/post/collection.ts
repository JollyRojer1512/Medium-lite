import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { PostGetOnePresenter } from "./getOne";
import { PostGetManyPresenter } from "./getMany";

export interface PostPresenterCollection {
  getOne: PostGetOnePresenter;
  getMany: PostGetManyPresenter;
}

@injectable()
export class PostPresenterCollectionImpl implements PostPresenterCollection {
  constructor(
    @inject(Symbols.Api.Presenter.Single.Main.Post.GetOne)
    readonly getOne: PostGetOnePresenter,
    @inject(Symbols.Api.Presenter.Single.Main.Post.GetMany)
    readonly getMany: PostGetManyPresenter
  ) {}
}
