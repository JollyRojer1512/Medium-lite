import { Container as InversifyContainer } from "inversify";
import { InfrastructureContainer } from "./containers/infrastructure";
import { Symbols } from "./symbols";
import { Db } from "../components/db";
import { ArchitectureContainer } from "./containers/architecture";
import { ApiContainer } from "./containers/api";

export class Container {
  static Services = new InversifyContainer();

  static async init(): Promise<void> {
    console.log("Starting the world");
    await Container.loadContainers();
    await Container.initDb();
    await Container.initModules();
    console.log("World started");
    return;
  }

  static async close(): Promise<void> {
    console.log("Stopping the world");
    const db = Container.Services.get<Db>(Symbols.Infrastructure.Db);
    await db.close();
    console.log("World stopped");
    return;
  }

  private static async loadContainers(): Promise<void> {
    Container.Services.load(InfrastructureContainer);
    Container.Services.load(ArchitectureContainer);
    Container.Services.load(ApiContainer);
  }

  private static async initDb(): Promise<void> {
    const db = Container.Services.get<Db>(Symbols.Infrastructure.Db);
    await db.init();
  }

  private static async initModules(): Promise<void> {
    const symbols = Symbols.Api.Module.Main;
    for (const module in symbols) {
      //@ts-ignore Works but ts does not like symbol element
      Container.Services.get(symbols[module]);
    }
  }
}
