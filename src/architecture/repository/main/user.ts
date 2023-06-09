import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { Db } from "../../../components/db";
import { User } from "../../../components/models/main/user";
import { TableNames } from "../../../components/models/types";
import { BaseRepository } from "../base";

export interface UserRepository {
  insertOne(entity: User): Promise<User>;

  getById(id: string): Promise<User | undefined>;

  getByEmail(email: string): Promise<User | undefined>;

  getBatch(take: number, skip: number): Promise<User[]>;

  updateRating(id: string, rating: number): Promise<unknown>;
}

@injectable()
export class UserRepositoryImpl
  extends BaseRepository<User>
  implements UserRepository
{
  constructor(@inject(Symbols.Infrastructure.Db) db: Db) {
    super({ table: db.main.getRepository(TableNames.users) });
  }

  override async insertOne(entity: User): Promise<User> {
    return await super.insertOne(entity);
  }

  async getById(id: string): Promise<User | undefined> {
    return await super.getOne({ where: { id: parseInt(id) } });
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await super.getOne({ where: { email } });
  }

  async getBatch(take: number, skip: number): Promise<User[]> {
    return await super.getMany({ skip, take });
  }

  async updateRating(id: string, rating: number): Promise<unknown> {
    return await super.updateOne({ id: parseInt(id) }, { rating });
  }
}
