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

export const ArchitectureContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    // Service
    bind<UserService>(Symbols.Architecture.Service.Main.User).to(
      UserServiceImpl
    );

    // Repository
    bind<UserRepository>(Symbols.Architecture.Repository.Main.User).to(
      UserRepositoryImpl
    );
  }
);
