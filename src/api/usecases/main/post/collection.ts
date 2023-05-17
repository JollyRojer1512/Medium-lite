import { inject, injectable } from "inversify";
import { Symbols } from "../../../../dependencies/symbols";
import { PostGetOneUsecase } from "./getOne";
import { PostGetAllByUserUsecase } from "./getAllByUser";
import { PostCreateOneUsecase } from "./createOne";
import { PostGetUsersPerPageUsecase } from "./getUsersPerPage";
import { PostRateOneUsecase } from "./rateOne";

export interface PostUsecaseCollection {
  createOne: PostCreateOneUsecase;
  getOne: PostGetOneUsecase;
  getAllByUser: PostGetAllByUserUsecase;
  getUsersPerPage: PostGetUsersPerPageUsecase;
  rateOne: PostRateOneUsecase;
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
    readonly getUsersPerPage: PostGetUsersPerPageUsecase,
    @inject(Symbols.Api.Usecase.Single.Main.Post.RateOne)
    readonly rateOne: PostRateOneUsecase
  ) {}
}
