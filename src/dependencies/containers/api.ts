import { ContainerModule, interfaces } from "inversify";
import { Symbols } from "../symbols";
import { UserModule } from "../../api/modules/main/user";
import {
  UserGetOneUsecase,
  UserGetOneUsecaseImpl,
} from "../../api/usecases/main/user/getOne";
import {
  UserUsecaseCollection,
  UserUsecaseCollectionImpl,
} from "../../api/usecases/main/user/collection";
import {
  UserPresenterCollection,
  UserPresenterCollectionImpl,
} from "../../api/presenters/main/user/collection";
import {
  UserGetOnePresenter,
  UserGetOnePresenterImpl,
} from "../../api/presenters/main/user/getOne";
import {
  UserCreateOneUsecase,
  UserCreateOneUsecaseImpl,
} from "../../api/usecases/main/user/createOne";
import {
  PostUsecaseCollection,
  PostUsecaseCollectionImpl,
} from "../../api/usecases/main/post/collection";
import {
  PostGetOneUsecase,
  PostGetOneUsecaseImpl,
} from "../../api/usecases/main/post/getOne";
import {
  PostGetAllByUserUsecase,
  PostGetAllByUserUsecaseImpl,
} from "../../api/usecases/main/post/getAllByUser";
import {
  PostPresenterCollection,
  PostPresenterCollectionImpl,
} from "../../api/presenters/main/post/collection";
import {
  PostGetOnePresenter,
  PostGetOnePresenterImpl,
} from "../../api/presenters/main/post/getOne";
import {
  PostGetManyPresenter,
  PostGetManyPresenterImpl,
} from "../../api/presenters/main/post/getMany";
import { PostModule } from "../../api/modules/main/post";
import { Module } from "../../api/modules/base";
import {
  PostCreateOneUsecase,
  PostCreateOneUsecaseImpl,
} from "../../api/usecases/main/post/createOne";
import {
  UserGetPageUsecase,
  UserGetPageUsecaseImpl,
} from "../../api/usecases/main/user/getPage";
import {
  UserGetManyPresenter,
  UserGetManyPresenterImpl,
} from "../../api/presenters/main/user/getMany";
import {
  PostGetUsersPerPageUsecase,
  PostGetUsersPerPageUsecaseImpl,
} from "../../api/usecases/main/post/getUsersPerPage";
import {
  UserLoginUsecase,
  UserLoginUsecaseImpl,
} from "../../api/usecases/main/user/login";
import {
  PostRateOneUsecase,
  PostRateOneUsecaseImpl,
} from "../../api/usecases/main/post/rateOne";

export const ApiContainer = new ContainerModule((bind: interfaces.Bind) => {
  // Modules
  bind<Module>(Symbols.Api.Module.Main.User).to(UserModule);
  bind<Module>(Symbols.Api.Module.Main.Post).to(PostModule);

  // Usecase

  // Collection
  bind<UserUsecaseCollection>(Symbols.Api.Usecase.Collection.Main.User).to(
    UserUsecaseCollectionImpl
  );
  bind<PostUsecaseCollection>(Symbols.Api.Usecase.Collection.Main.Post).to(
    PostUsecaseCollectionImpl
  );

  // Single
  bind<UserCreateOneUsecase>(Symbols.Api.Usecase.Single.Main.User.CreateOne).to(
    UserCreateOneUsecaseImpl
  );
  bind<UserGetOneUsecase>(Symbols.Api.Usecase.Single.Main.User.GetOne).to(
    UserGetOneUsecaseImpl
  );
  bind<UserGetPageUsecase>(Symbols.Api.Usecase.Single.Main.User.GetPage).to(
    UserGetPageUsecaseImpl
  );
  bind<UserLoginUsecase>(Symbols.Api.Usecase.Single.Main.User.Login).to(
    UserLoginUsecaseImpl
  );
  bind<PostCreateOneUsecase>(Symbols.Api.Usecase.Single.Main.Post.CreateOne).to(
    PostCreateOneUsecaseImpl
  );
  bind<PostGetOneUsecase>(Symbols.Api.Usecase.Single.Main.Post.GetOne).to(
    PostGetOneUsecaseImpl
  );
  bind<PostGetAllByUserUsecase>(
    Symbols.Api.Usecase.Single.Main.Post.GetAllByUser
  ).to(PostGetAllByUserUsecaseImpl);
  bind<PostGetUsersPerPageUsecase>(
    Symbols.Api.Usecase.Single.Main.Post.GetUsersPerPage
  ).to(PostGetUsersPerPageUsecaseImpl);
  bind<PostRateOneUsecase>(Symbols.Api.Usecase.Single.Main.Post.RateOne).to(
    PostRateOneUsecaseImpl
  );

  // Presenter

  // Collection
  bind<UserPresenterCollection>(Symbols.Api.Presenter.Collection.Main.User).to(
    UserPresenterCollectionImpl
  );
  bind<PostPresenterCollection>(Symbols.Api.Presenter.Collection.Main.Post).to(
    PostPresenterCollectionImpl
  );

  // Single
  bind<UserGetOnePresenter>(Symbols.Api.Presenter.Single.Main.User.GetOne).to(
    UserGetOnePresenterImpl
  );
  bind<UserGetManyPresenter>(Symbols.Api.Presenter.Single.Main.User.GetMany).to(
    UserGetManyPresenterImpl
  );
  bind<PostGetOnePresenter>(Symbols.Api.Presenter.Single.Main.Post.GetOne).to(
    PostGetOnePresenterImpl
  );
  bind<PostGetManyPresenter>(Symbols.Api.Presenter.Single.Main.Post.GetMany).to(
    PostGetManyPresenterImpl
  );
});
