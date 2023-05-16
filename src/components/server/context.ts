import { InvalidParam } from "../error/list";

export class Context<Body, Query> {
  constructor(
    private readonly _bodyParams: Body | undefined,
    private readonly _queryParams: Query | undefined
  ) {}

  get bodyParams(): Body {
    if (!this._bodyParams) throw new InvalidParam("Body Params");
    return this._bodyParams;
  }

  get queryParams(): Query {
    if (!this._queryParams) throw new InvalidParam("Query Params");
    return this._queryParams;
  }
}
