export class Context<P> {
  constructor(private readonly _params: P | undefined) {}

  get params(): P | undefined {
    return this._params;
  }
}
