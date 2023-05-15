import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { Db } from "../../../components/db";
import { Repository } from "typeorm";
import { Post } from "../../../components/models/main/post";
import { TableNames } from "../../../components/models/types";

export interface PostRepository {
  insertOne(entity: Post): Promise<Post>;
}

@injectable()
export class PostRepositoryImpl implements PostRepository {
  private readonly table: Repository<Post>;

  constructor(@inject(Symbols.Infrastructure.Db) db: Db) {
    this.table = db.main.getRepository(TableNames.posts);
  }

  async insertOne(entity: Post): Promise<Post> {
    await this.table.insert(entity);
    return entity;
  }
}
