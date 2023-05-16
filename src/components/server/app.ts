import { injectable } from "inversify";
import * as core from "express-serve-static-core";
import express, {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Request } from "./request";
import { Response } from "./response";
import { ParamsDeclaration } from "../../api/usecases/types";
import { Context } from "./context";

export type RequestHandlerParams<P, R> = {
  name: string;
  usecase(
    context: Context<P | undefined, undefined | Record<string, string>>
  ): Promise<R>;
  params?: ParamsDeclaration<P>;
};

export interface App {
  listen(host: string, port: number): Promise<void>;

  init(): Promise<void>;

  addGetHandler<P, R>(params: RequestHandlerParams<P, R>): Promise<void>;

  addPostHandler<P, R>(params: RequestHandlerParams<P, R>): Promise<void>;
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

  async addGetHandler<P, R>(params: RequestHandlerParams<P, R>): Promise<void> {
    this.client.get(
      params.name,
      async (req: ExpressRequest, res: ExpressResponse) =>
        await this.handleRequest<P, R>(req, res, params)
    );
  }

  async addPostHandler<P, R>(
    params: RequestHandlerParams<P, R>
  ): Promise<void> {
    this.client.post(
      params.name,
      async (req: ExpressRequest, res: ExpressResponse) =>
        await this.handleRequest<P, R>(req, res, params)
    );
  }

  private async handleRequest<P, R>(
    req: ExpressRequest,
    res: ExpressResponse,
    params: RequestHandlerParams<P, R>
  ): Promise<void> {
    const request = new Request<P>(req);
    const response = new Response(res);
    try {
      if (params.params) request.validateBodyParams(params.params);
      const context = new Context<
        P | undefined,
        undefined | Record<string, string>
      >(request.bodyParams, request.queryParams);
      const result = await params.usecase(context);
      await response.success(result);
    } catch (e) {
      await response.success(e);
    }
  }
}
