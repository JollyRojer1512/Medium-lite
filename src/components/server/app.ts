import { injectable } from "inversify";
import * as core from "express-serve-static-core";
import express, {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Request } from "./request";
import { Response } from "./response";

export interface App {
  listen(host: string, port: number): Promise<void>;

  init(): Promise<void>;

  addGetHandler(name: string, func: Function): Promise<void>;

  addPostHandler(name: string, func: Function): Promise<void>;
}

@injectable()
export class AppImpl implements App {
  private readonly client: core.Express;

  constructor() {
    this.client = express();
  }

  async listen(host: string, port: number): Promise<void> {
    this.client.listen(port, host);
  }

  async init(): Promise<void> {
    // this.client.all("/", async (req, res, next) =>
    //   this.handleRequest(req, res, next)
    // );
  }

  async addGetHandler(name: string, func: Function): Promise<void> {
    this.client.get(
      name,
      async (req: ExpressRequest, res: ExpressResponse) =>
        await this.handleRequest(req, res, func)
    );
  }

  async addPostHandler(name: string, func: Function): Promise<void> {
    this.client.post(name, async (req: Request) => await func(req));
  }

  private async handleRequest(
    req: ExpressRequest,
    res: ExpressResponse,
    nextFunction: Function
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
