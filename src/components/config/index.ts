import { injectable } from "inversify";
import * as dotenv from "dotenv";

export enum UserLanguage {
  uz = "uz",
  ru = "ru",
  en = "en",
}

export type DbConnections = {
  main: string;
};
type DbConfig = {
  connections: DbConnections;
};

export type ServerConfig = {
  host: string;
  port: number;
};

type Env = {
  MAIN_DB_FILENAME: string;
  SERVER_HOST: string;
  SERVER_PORT: string;
};

@injectable()
export class Config {
  private readonly _db: DbConfig;
  private readonly _server: ServerConfig;

  constructor() {
    dotenv.config();
    const env: Env = process.env as unknown as Env;
    this._db = {
      connections: {
        main: env.MAIN_DB_FILENAME || "./main.sqlite",
      },
    };
    this._server = {
      host: env.SERVER_HOST || "127.0.0.1",
      port: env.SERVER_PORT ? parseInt(env.SERVER_PORT) : 1512,
    };
  }

  get dbConnections(): DbConnections {
    return this._db.connections;
  }

  get dbClient(): "sqlite" {
    return "sqlite";
  }

  get server(): ServerConfig {
    return this._server;
  }
}
