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

export const ArchitectureContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    // Service
    bind<CryptService>(Symbols.Architecture.Service.Main.Crypt).to(
      CryptServiceImpl
    );
    bind<PostService>(Symbols.Architecture.Service.Main.Post).to(
      PostServiceImpl
    );
    bind<UserService>(Symbols.Architecture.Service.Main.User).to(
      UserServiceImpl
    );

    // Repository
    bind<PostRepository>(Symbols.Architecture.Repository.Main.Post).to(
      PostRepositoryImpl
    );
    bind<UserRepository>(Symbols.Architecture.Repository.Main.User).to(
      UserRepositoryImpl
    );
  }
);
