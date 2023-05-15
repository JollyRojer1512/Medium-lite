import { Request as ExpressRequest } from "express";

export class Request<Data> {
  private readonly headers: Record<string, string | string[] | undefined>;
  private readonly body: Data;

  constructor(private readonly request: ExpressRequest) {
    this.headers = this.request.headers;
    this.body = this.request.body;
    console.log(this.headers, this.body);
  }

  get responseHeaders(): Record<string, string> {
    return {};
  }

  get params(): Data {
    return this.body;
  }
}
