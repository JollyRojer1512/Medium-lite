import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { User } from "../../../../components/models/main/user";
import { Symbols } from "../../../../dependencies/symbols";
import { UserService } from "../../../../architecture/service/main/user";
import {
  InvalidLoginData,
  UserNotFound,
} from "../../../../components/error/main";
import { ParamsDeclaration, Validate } from "../../base";

export const UserLoginUsecaseParams: ParamsDeclaration<UserLoginUsecaseInput> =
  {
    email: { type: String, validate: Validate.email },
    password: { type: String },
  };

export type UserLoginUsecaseInput = {
  email: string;
  password: string;
};
type UserLoginUsecaseOutput = {
  user: User;
};

export interface UserLoginUsecase {
  execute(
    context: Context<UserLoginUsecaseInput, undefined>
  ): Promise<UserLoginUsecaseOutput>;
}

@injectable()
export class UserLoginUsecaseImpl implements UserLoginUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.User)
    private readonly userService: UserService
  ) {}

  async execute(
    context: Context<UserLoginUsecaseInput, undefined>
  ): Promise<UserLoginUsecaseOutput> {
    const user = await this.userService.getByEmail(context.bodyParams.email);
    if (!user) throw new UserNotFound();
    const isCorrectPassword = await this.userService.checkPassword(
      context.bodyParams.password,
      user.salt,
      user.password
    );
    if (!isCorrectPassword) throw new InvalidLoginData();
    return { user };
  }
}
