import { ContainerModule, interfaces } from "inversify";
import { Symbols } from "../symbols";
import {
  UserService,
  UserServiceImpl,
} from "../../architecture/service/main/user";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../../architecture/repository/main/user";
import {
  PostService,
  PostServiceImpl,
} from "../../architecture/service/main/post";
import {
  PostRepository,
  PostRepositoryImpl,
} from "../../architecture/repository/main/post";
import {
  CryptService,
  CryptServiceImpl,
} from "../../architecture/service/main/crypt";
import {
  ReviewService,
  ReviewServiceImpl,
} from "../../architecture/service/main/review";
import {
  ReviewRepository,
  ReviewRepositoryImpl,
} from "../../architecture/repository/main/review";

export const ArchitectureContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    // Service
    bind<CryptService>(Symbols.Architecture.Service.Main.Crypt).to(
      CryptServiceImpl
    );
    bind<PostService>(Symbols.Architecture.Service.Main.Post).to(
      PostServiceImpl
    );
    bind<ReviewService>(Symbols.Architecture.Service.Main.Review).to(
      ReviewServiceImpl
    );
    bind<UserService>(Symbols.Architecture.Service.Main.User).to(
      UserServiceImpl
    );

    // Repository
    bind<PostRepository>(Symbols.Architecture.Repository.Main.Post).to(
      PostRepositoryImpl
    );
    bind<ReviewRepository>(Symbols.Architecture.Repository.Main.Review).to(
      ReviewRepositoryImpl
    );
    bind<UserRepository>(Symbols.Architecture.Repository.Main.User).to(
      UserRepositoryImpl
    );
  }
);
