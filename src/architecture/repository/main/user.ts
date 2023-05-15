import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { Db } from "../../../components/db";
import { Repository } from "typeorm";
import { User } from "../../../components/models/main/user";
import { TableNames } from "../../../components/models/types";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

export interface UserRepository {
  insertOne(entity: User): Promise<User>;

  getById(id: number): Promise<User | undefined>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly table: Repository<User>;

  constructor(@inject(Symbols.Infrastructure.Db) db: Db) {
    this.table = db.main.getRepository(TableNames.users);
  }

  async insertOne(entity: User): Promise<User> {
    await this.table.insert(entity);
    return entity;
  }

  async getById(id: number): Promise<User | undefined> {
    return await this.getOne({ id });
  }

  private async getOne(
    query: FindOptionsWhere<User>
  ): Promise<User | undefined> {
    const result = await this.table.findOneBy(query);
    return result || undefined;
  }
}
