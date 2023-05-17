import { User, UserPresenter } from "../../../../components/models/main/user";
import { Context } from "../../../../components/server/context";
import { injectable } from "inversify";

type UserGetManyPresenterInput = {
  users: User[];
};

export type UserGetManyPresenterOutput = {
  authors: UserPresenter[];
};

export interface UserGetManyPresenter {
  format(
    context: Context<unknown, unknown>,
    params: UserGetManyPresenterInput
  ): UserGetManyPresenterOutput;
}

@injectable()
export class UserGetManyPresenterImpl implements UserGetManyPresenter {
  format(
    context: Context<unknown, unknown>,
    params: UserGetManyPresenterInput
  ): UserGetManyPresenterOutput {
    const users = params.users.map((user) => user.presenter());
    return { authors: users };
  }
}
