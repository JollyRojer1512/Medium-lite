import { Response as ExpressResponse } from "express";
import { BaseError, UnexpectedError } from "../error/main";

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

  async error(error: BaseError | any): Promise<void> {
    const presenter = error.presenter
      ? error.presenter()
      : new UnexpectedError(error.message).presenter();
    const result = { error: presenter };
    const output = Buffer.from(JSON.stringify(result));

    this.response.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": output.length,
    });
    this.response.end(output);
  }
}
