import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { User } from "../../../../components/models/main/user";
import { Symbols } from "../../../../dependencies/symbols";
import { UserService } from "../../../../architecture/service/main/user";
import { UserNotFound } from "../../../../components/error/main";

export type UserGetOneUsecaseInput = {
  id: string;
};
type UserGetOneUsecaseOutput = {
  user: User;
};

export interface UserGetOneUsecase {
  execute(
    context: Context<undefined, UserGetOneUsecaseInput>
  ): Promise<UserGetOneUsecaseOutput>;
}

@injectable()
export class UserGetOneUsecaseImpl implements UserGetOneUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.User)
    private readonly userService: UserService
  ) {}

  async execute(
    context: Context<undefined, UserGetOneUsecaseInput>
  ): Promise<UserGetOneUsecaseOutput> {
    const user = await this.userService.getById(context.queryParams.id);
    if (!user) throw new UserNotFound();
    return { user };
  }
}
