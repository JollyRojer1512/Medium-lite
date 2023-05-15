import { injectable } from "inversify";
import * as dotenv from "dotenv";

export type DbConnections = {
  main: string;
};
type DbConfig = {
  connections: DbConnections;
};

type Env = {
  MAIN_DB_FILENAME: string;
};

@injectable()
export class Config {
  private readonly _db: DbConfig;

  constructor() {
    dotenv.config();
    const env: Env = process.env as unknown as Env;
    this._db = {
      connections: {
        main: env.MAIN_DB_FILENAME || "./main.sqlite",
      },
    };
  }

  get dbConnections(): DbConnections {
    return this._db.connections;
  }

  get dbClient(): "sqlite" {
    return "sqlite";
  }
}
