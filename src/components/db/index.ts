import { inject, injectable } from "inversify";
import { Symbols } from "../../dependencies/symbols";
import { Config } from "../config";
import { DataSource } from "typeorm";
import { dbEntities } from "../models";

export interface Db {
  init(): Promise<void>;

  close(): Promise<void>;

  main: DataSource;
}

@injectable()
export class DbImpl implements Db {
  private readonly _main: DataSource;

  constructor(@inject(Symbols.Infrastructure.Config) config: Config) {
    this._main = new DataSource({
      type: config.dbClient,
      database: config.dbConnections.main,
      synchronize: true,
      logging: true,
      entities: dbEntities.main,
    });
  }

  async init(): Promise<void> {
    await this._main.initialize();
    await this._main.runMigrations();
  }

  async close(): Promise<void> {
    await this._main.destroy();
  }

  get main(): DataSource {
    return this._main;
  }
}
