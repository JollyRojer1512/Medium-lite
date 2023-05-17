import { injectable } from "inversify";
import { ObjectLiteral, Repository } from "typeorm";
import { DbError } from "../../components/error/db";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

@injectable()
export abstract class BaseRepository<Entity extends ObjectLiteral> {
  private readonly table: Repository<Entity>;

  constructor(params: { table: Repository<Entity> }) {
    this.table = params.table;
  }

  async insertOne(entity: Entity): Promise<Entity> {
    try {
      await this.table.insert(entity);
      return entity;
    } catch (e: any) {
      throw new DbError(e);
    }
  }

  async getOne(query: FindOneOptions<Entity>): Promise<Entity | undefined> {
    try {
      const result = await this.table.findOne(query);
      return result || undefined;
    } catch (e: any) {
      throw new DbError(e);
    }
  }

  async getMany(query: FindManyOptions<Entity>): Promise<Entity[]> {
    try {
      return await this.table.find(query);
    } catch (e: any) {
      throw new DbError(e);
    }
  }
}
