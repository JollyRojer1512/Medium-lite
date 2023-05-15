import { Response as ExpressResponse } from "express";

export class Response {
  constructor(private readonly response: ExpressResponse) {}

  async end(result: unknown): Promise<void> {
    await this.response.writeHead(200, {});
    await this.response.end(result);
  }

  async error(error: unknown): Promise<void> {
    await this.response.writeHead(200, {});
    await this.response.end(error);
  }
}
