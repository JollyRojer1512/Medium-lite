import { ContainerModule, interfaces } from "inversify";
import { Symbols } from "../symbols";
import {Config} from "../../components/config";
import {Db, DbImpl} from "../../components/db";

export const InfrastructureContainer = new ContainerModule((bind: interfaces.Bind) => {
    bind<Config>(Symbols.Infrastructure.Config).to(Config).inSingletonScope();
    bind<Db>(Symbols.Infrastructure.Db).to(DbImpl).inSingletonScope();
});
