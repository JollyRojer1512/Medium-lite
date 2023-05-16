import { injectable } from "inversify";
import { ParamsDeclaration } from "../../types";
import { Context } from "../../../../components/server/context";

export const UserGetOneUsecaseInputParams: ParamsDeclaration<UserGetOneUsecaseInput> =
  {};

export type UserGetOneUsecaseInput = {};
export type UserGetOneUsecaseOutput = {
  response: string;
};

export interface UserGetOneUsecase {
  execute(
    context: Context<UserGetOneUsecaseInput>
  ): Promise<UserGetOneUsecaseOutput>;
}

@injectable()
export class UserGetOneUsecaseImpl implements UserGetOneUsecase {
  constructor() {}

  async execute(
    context: Context<UserGetOneUsecaseInput>
  ): Promise<UserGetOneUsecaseOutput> {
    return {
      response: JSON.stringify(context.params),
    };
  }
}
