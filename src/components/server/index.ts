import { inject, injectable } from "inversify";
import { Symbols } from "../../dependencies/symbols";
import { Config, ServerConfig } from "../config";
import { App } from "./app";
import { ServerIsListening } from "../error/list";
import { Container } from "../../dependencies";

export interface Server {
  listen(): Promise<void>;
  initMainModules(): Promise<void>;
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

  async initMainModules(): Promise<void> {
    for (const key in Symbols.Api.Module.Main) {
      const module = Container.Services.get<{ init?: () => Promise<void> }>(
        //@ts-ignore Works but ts does not like symbol element
        Symbols.Api.Module.Main[key]
      );
      if (module.init) await module.init();
    }
  }

  async listen(): Promise<void> {
    if (this.isStarted) throw new ServerIsListening();
    this.isStarted = true;
    await this.app.init();
    this.app.listen(this.api.host, this.api.port);
  }
}
