import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { UserRepository } from "../../repository/main/user";
import { User, UserModel } from "../../../components/models/main/user";
import { CryptService } from "./crypt";

type UserServiceCreateNewParams = Omit<UserModel, "id" | "createTime">;

export interface UserService {
  createNew(params: UserServiceCreateNewParams): Promise<User>;

  getById(id: string): Promise<User | undefined>;

  getByEmail(email: string): Promise<User | undefined>;

  getPage(page: number, amount: number): Promise<User[]>;

  checkPassword(
    password: string,
    salt: string,
    hashedPassword: string
  ): Promise<boolean>;
}

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(Symbols.Architecture.Repository.Main.User)
    private readonly repository: UserRepository,
    @inject(Symbols.Architecture.Service.Main.Crypt)
    private readonly cryptService: CryptService
  ) {}

  async createNew(params: UserServiceCreateNewParams): Promise<User> {
    const entity = new User();
    entity.email = params.email;
    const salt = this.cryptService.generateHash();
    const hashedPassword = await this.cryptService.generateSaltedHash(
      params.password,
      salt
    );
    entity.salt = salt;
    entity.password = hashedPassword;
    return await this.repository.insertOne(entity);
  }

  async getById(id: string): Promise<User | undefined> {
    return await this.repository.getById(id);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.repository.getByEmail(email);
  }

  async getPage(page: number, amount: number): Promise<User[]> {
    const skip = amount * (page - 1);
    return await this.repository.getBatch(amount, skip);
  }

  async checkPassword(
    password: string,
    salt: string,
    hashedPassword: string
  ): Promise<boolean> {
    const saltedPassword = await this.cryptService.generateSaltedHash(
      password,
      salt
    );
    return saltedPassword === hashedPassword;
  }
}
