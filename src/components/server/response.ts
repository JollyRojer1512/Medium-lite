import { Response as ExpressResponse } from "express";

export class Response {
  constructor(private readonly response: ExpressResponse) {}

  async success(data: any): Promise<void> {
    const result = Buffer.from(JSON.stringify(data));

    this.response.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": result.length,
    });
    this.response.end(result);
  }
}
