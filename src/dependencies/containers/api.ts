import { ContainerModule, interfaces } from "inversify";
import { Symbols } from "../symbols";
import { UserModule } from "../../api/modules/user";

export const ApiContainer = new ContainerModule((bind: interfaces.Bind) => {
  // Modules
  bind<UserModule>(Symbols.Api.Module.User).to(UserModule);
});
