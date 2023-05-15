import { inject, injectable } from "inversify";
import { Symbols } from "../../dependencies/symbols";
import { App } from "../../components/server/app";
import { Request } from "../../components/server/request";

@injectable()
export class UserModule {
  constructor(@inject(Symbols.Infrastructure.App) private readonly app: App) {
    this.app.addGetHandler("/users", this.getOne);
  }

  private async getOne(request: Request): Promise<unknown> {
    console.log("Here");
    return "test";
  }
}
