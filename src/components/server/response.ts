import { Response as ExpressResponse } from "express";
import { BaseError } from "../error/main";

export class Response {
  constructor(private readonly response: ExpressResponse) {}

  async success(data: any): Promise<void> {
    const result = { result: data };
    const output = Buffer.from(JSON.stringify(result));

    this.response.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": output.length,
    });
    this.response.end(output);
  }

  async error(error: BaseError | unknown): Promise<void> {
    const presenter = error instanceof BaseError ? error.presenter() : error;
    const result = { error: presenter };
    const output = Buffer.from(JSON.stringify(result));

    this.response.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": output.length,
    });
    this.response.end(output);
  }
}
