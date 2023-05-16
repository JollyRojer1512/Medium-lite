import { inject, injectable } from "inversify";
import { Symbols } from "../../dependencies/symbols";
import { Config, ServerConfig } from "../config";
import { App } from "./app";
import { ServerIsListeningError } from "../error/list";

export interface Server {
  listen(): Promise<void>;
}

@injectable()
export class ServerImpl implements Server {
  private readonly api: ServerConfig;
  private isStarted: boolean;

  constructor(
    @inject(Symbols.Infrastructure.App) private readonly app: App,
    @inject(Symbols.Infrastructure.Config) config: Config
  ) {
    this.api = {
      host: config.server.host,
      port: config.server.port,
    };
    this.isStarted = false;
  }

  async listen(): Promise<void> {
    if (this.isStarted) throw new ServerIsListeningError();
    this.isStarted = true;
    await this.app.init();
    this.app.listen(this.api.host, this.api.port);
  }
}
