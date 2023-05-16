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

export const ApiContainer = new ContainerModule((bind: interfaces.Bind) => {
  // Modules
  bind<UserModule>(Symbols.Api.Module.Main.User).to(UserModule);

  // Usecase

  // Collection
  bind<UserUsecaseCollection>(Symbols.Api.Usecase.Collection.Main.User).to(
    UserUsecaseCollectionImpl
  );

  // Single
  bind<UserGetOneUsecase>(Symbols.Api.Usecase.Single.Main.User.GetOne).to(
    UserGetOneUsecaseImpl
  );
});
