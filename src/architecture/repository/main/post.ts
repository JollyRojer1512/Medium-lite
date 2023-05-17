import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { Db } from "../../../components/db";
import { Post } from "../../../components/models/main/post";
import { TableNames } from "../../../components/models/types";
import { BaseRepository } from "../base";
import { FindOptionsRelations } from "typeorm/find-options/FindOptionsRelations";

export interface PostRepository {
  insertOne(entity: Post): Promise<Post>;

  getAllByUserId(id: string): Promise<Post[]>;

  getById(id: string): Promise<Post | undefined>;
}

@injectable()
export class PostRepositoryImpl
  extends BaseRepository<Post>
  implements PostRepository
{
  private readonly defaultRelations: FindOptionsRelations<Post> = {
    author: true,
  };

  constructor(@inject(Symbols.Infrastructure.Db) db: Db) {
    super({ table: db.main.getRepository(TableNames.posts) });
  }

  override async insertOne(entity: Post): Promise<Post> {
    return await super.insertOne(entity);
  }

  async getAllByUserId(id: string): Promise<Post[]> {
    return await super.getMany({
      where: { author: { id: parseInt(id) } },
      relations: this.defaultRelations,
    });
  }

  async getById(id: string): Promise<Post | undefined> {
    return await super.getOne({
      where: { id: parseInt(id) },
      relations: this.defaultRelations,
    });
  }
}
