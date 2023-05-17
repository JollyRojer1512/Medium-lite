import { User, UserPresenter } from "../../../../components/models/main/user";
import { Context } from "../../../../components/server/context";
import { injectable } from "inversify";

type UserGetOnePresenterInput = {
  user: User;
};

export type UserGetOnePresenterOutput = {
  author: UserPresenter;
};

export interface UserGetOnePresenter {
  format(
    context: Context<unknown, unknown>,
    params: UserGetOnePresenterInput
  ): UserGetOnePresenterOutput;
}

@injectable()
export class UserGetOnePresenterImpl implements UserGetOnePresenter {
  format(
    context: Context<unknown, unknown>,
    params: UserGetOnePresenterInput
  ): UserGetOnePresenterOutput {
    const user = params.user.presenter();
    return { author: user };
  }
}
