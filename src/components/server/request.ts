import { Request as ExpressRequest } from "express";
import { ParamDeclaration, ParamsDeclaration } from "../../api/usecases/base";
import { InvalidParam } from "../error/main";

export class Request<Body> {
  private readonly _headers: Record<string, string | string[] | undefined>;
  private readonly requestBody: Record<string, any>;
  private readonly requestParams: Record<string, string>;

  private verifiedBodyParams: Body | undefined;

  constructor(private readonly request: ExpressRequest) {
    this._headers = this.request.headers;
    this.requestBody = this.request.body;
    this.requestParams = this.request.params;
  }

  get responseHeaders(): Record<string, string> {
    return {};
  }

  get bodyParams(): Body | undefined {
    return this.verifiedBodyParams;
  }

  get queryParams(): Record<string, string> {
    return this.requestParams;
  }

  validateBodyParams(params: ParamsDeclaration<Body>): void {
    const result: Body = {} as Body;
    for (const key in params) {
      if (this.requestBody[key]) {
        result[key] = this.prepareBodyField(
          this.requestBody[key],
          params[key],
          key
        );
      }
    }
    this.verifiedBodyParams = result;
  }

  get headers(): Record<string, string | string[] | undefined> {
    return this._headers;
  }

  private prepareBodyField<T>(
    value: T,
    field: ParamDeclaration<T>,
    name: string
  ): T {
    if (!value) {
      if (field.default) {
        return typeof field.default == "function"
          ? field.default()
          : field.default;
      }
      throw new InvalidParam(name);
    }

    if (value.constructor !== field.type) {
      throw new InvalidParam(name);
    }

    if (field.coerce) {
      value = field.coerce(value);
    }

    if (typeof field.validate == "function" && !field.validate(value)) {
      throw new InvalidParam(name);
    }

    if (field.convert) {
      value = field.convert(value);
    }

    return value;
  }
}
