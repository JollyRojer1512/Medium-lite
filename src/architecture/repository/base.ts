import { injectable } from "inversify";
import { ObjectLiteral, Repository } from "typeorm";
import { DbError } from "../../components/error/db";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { PickKeysByType } from "typeorm/common/PickKeysByType";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

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

  async updateOne(
    query: FindOptionsWhere<Entity>,
    update: QueryDeepPartialEntity<Entity>
  ): Promise<unknown | undefined> {
    try {
      const result = await this.table.update(query, update);
      return result?.raw || undefined;
    } catch (e: any) {
      throw new DbError(e);
    }
  }

  async average(
    column: PickKeysByType<Entity, number>,
    query?: FindOptionsWhere<Entity>
  ): Promise<number | undefined> {
    try {
      const result = await this.table.average(column, query);
      return result || undefined;
    } catch (e: any) {
      throw new DbError(e);
    }
  }

  async kostylAverageForSameColumnNameTables(
    params: {
      queryBuilderAlias: string;
      leftJoinAndSelectProperty: string;
      leftJoinAndSelectAlias: string;
      selection: string;
    },
    where: FindOptionsWhere<Entity>
  ): Promise<number | undefined> {
    const selectionAlias = "avg";
    try {
      const result = await this.table
        .createQueryBuilder(params.queryBuilderAlias)
        .leftJoinAndSelect(
          params.leftJoinAndSelectProperty,
          params.leftJoinAndSelectAlias
        )
        .select(`avg(${params.selection})`, selectionAlias)
        .where(where)
        .execute();
      return result[0][selectionAlias];
    } catch (e: any) {
      throw new DbError(e);
    }
  }

  getTable(): Repository<Entity> {
    return this.table;
  }
}
