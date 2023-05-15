import { inject, injectable } from "inversify";
import { Symbols } from "../../dependencies/symbols";
import { Config, ServerConfig } from "../config";
import express, {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import * as core from "express-serve-static-core";
import { ServerIsListeningError } from "../error/list";
import { Request } from "./request";
import { Response } from "./response";

export interface Server {
  listen(): Promise<void>;
}

@injectable()
export class ServerImpl implements Server {
  private readonly api: ServerConfig;
  private readonly client: core.Express;
  private isStarted: boolean;

  constructor(@inject(Symbols.Infrastructure.Config) config: Config) {
    this.api = {
      host: config.server.host,
      port: config.server.port,
    };
    this.isStarted = false;
    this.client = express();
  }

  async listen(): Promise<void> {
    if (this.isStarted) throw new ServerIsListeningError();
    this.isStarted = true;
    this.client.all("/", async (req, res, next) =>
      this.handleRequest(req, res, next)
    );
    this.client.listen(this.api.port, this.api.host);
  }

  private async handleRequest(
    req: ExpressRequest,
    res: ExpressResponse,
    nextFunction: NextFunction
  ): Promise<void> {
    const request = new Request(req);
    const response = new Response(res);
    try {
      const result = await nextFunction(request);
      await response.end(result);
    } catch (e) {
      await response.error(e);
    }
  }
}
