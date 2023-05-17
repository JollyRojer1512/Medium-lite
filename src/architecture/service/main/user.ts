import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { UserRepository } from "../../repository/main/user";
import { User, UserModel } from "../../../components/models/main/user";

type UserServiceCreateNewParams = Omit<UserModel, "id" | "createTime">;

export interface UserService {
  createNew(params: UserServiceCreateNewParams): Promise<User>;

  getById(id: string): Promise<User | undefined>;

  getPage(page: number, amount: number): Promise<User[]>;
}

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(Symbols.Architecture.Repository.Main.User)
    private readonly repository: UserRepository
  ) {}

  async createNew(params: UserServiceCreateNewParams): Promise<User> {
    const entity = new User();
    entity.email = params.email;
    entity.password = params.password;
    return await this.repository.insertOne(entity);
  }

  async getById(id: string): Promise<User | undefined> {
    return await this.repository.getById(id);
  }

  async getPage(page: number, amount: number): Promise<User[]> {
    return await this.repository.getBatch(amount, page);
  }
}
