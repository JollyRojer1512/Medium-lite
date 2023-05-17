import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { User } from "../../../../components/models/main/user";
import { Symbols } from "../../../../dependencies/symbols";
import { UserService } from "../../../../architecture/service/main/user";

export type UserGetPageUsecaseQueryInput = {
  page: string;
  amount?: string;
};
export type UserGetPageUsecaseBodyInput = {};
type UserGetPageUsecaseOutput = {
  users: User[];
};

export interface UserGetPageUsecase {
  execute(
    context: Context<UserGetPageUsecaseBodyInput, UserGetPageUsecaseQueryInput>
  ): Promise<UserGetPageUsecaseOutput>;
}

@injectable()
export class UserGetPageUsecaseImpl implements UserGetPageUsecase {
  private readonly defaultAmountPerPage = 20;

  constructor(
    @inject(Symbols.Architecture.Service.Main.User)
    private readonly userService: UserService
  ) {}

  async execute(
    context: Context<UserGetPageUsecaseBodyInput, UserGetPageUsecaseQueryInput>
  ): Promise<UserGetPageUsecaseOutput> {
    const users = await this.userService.getPage(
      parseInt(context.queryParams.page),
      context.queryParams.amount
        ? parseInt(context.queryParams.amount)
        : this.defaultAmountPerPage
    );
    return { users };
  }
}
