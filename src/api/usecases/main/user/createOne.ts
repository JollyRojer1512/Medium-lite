import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { User } from "../../../../components/models/main/user";
import { Symbols } from "../../../../dependencies/symbols";
import { UserService } from "../../../../architecture/service/main/user";
import { ParamsDeclaration, Validate } from "../../base";

export const UserCreateOneUsecaseParams: ParamsDeclaration<UserCreateOneUsecaseInput> =
  {
    email: { type: String, validate: Validate.email },
    password: { type: String },
  };

export type UserCreateOneUsecaseInput = {
  email: string;
  password: string;
};
type UserCreateOneUsecaseOutput = {
  user: User;
};

export interface UserCreateOneUsecase {
  execute(
    context: Context<UserCreateOneUsecaseInput, undefined>
  ): Promise<UserCreateOneUsecaseOutput>;
}

@injectable()
export class UserCreateOneUsecaseImpl implements UserCreateOneUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.User)
    private readonly userService: UserService
  ) {}

  async execute(
    context: Context<UserCreateOneUsecaseInput, undefined>
  ): Promise<UserCreateOneUsecaseOutput> {
    const user = await this.userService.createNew({
      email: context.bodyParams.email,
      password: context.bodyParams.password,
    });
    return { user };
  }
}
