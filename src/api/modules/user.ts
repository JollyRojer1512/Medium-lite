import { inject, injectable } from "inversify";
import { Symbols } from "../../dependencies/symbols";
import { App } from "../../components/server/app";
import { Request } from "../../components/server/request";
import { UserService } from "../../architecture/service/main/user";

@injectable()
export class UserModule {
  constructor(
    @inject(Symbols.Infrastructure.App) private readonly app: App,
    @inject(Symbols.Architecture.Service.Main.User)
    private readonly userService: UserService
  ) {
    this.app.addGetHandler("/users", this.getOne.bind(this));
  }

  private async getOne(request: Request): Promise<unknown> {
    const result = await this.userService.getById(1);
    return result;
  }
}
