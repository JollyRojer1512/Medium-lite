import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { PostGetOneUsecase } from "./getOne";
import { PostGetAllByUserUsecase } from "./getAllByUser";
import { PostCreateOneUsecase } from "./createOne";
import { PostGetUsersPerPageUsecase } from "./getUsersPerPage";

export interface PostUsecaseCollection {
  createOne: PostCreateOneUsecase;
  getOne: PostGetOneUsecase;
  getAllByUser: PostGetAllByUserUsecase;
  getUsersPerPage: PostGetUsersPerPageUsecase;
}

@injectable()
export class PostUsecaseCollectionImpl implements PostUsecaseCollection {
  constructor(
    @inject(Symbols.Api.Usecase.Single.Main.Post.CreateOne)
    readonly createOne: PostCreateOneUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.Post.GetOne)
    readonly getOne: PostGetOneUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.Post.GetAllByUser)
    readonly getAllByUser: PostGetAllByUserUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.Post.GetUsersPerPage)
    readonly getUsersPerPage: PostGetUsersPerPageUsecase
  ) {}
}
