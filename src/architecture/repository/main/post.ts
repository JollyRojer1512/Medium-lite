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

  getBatchByAuthorId(id: string, take: number, skip: number): Promise<Post[]>;

  updateRating(id: string, rating: number): Promise<unknown>;

  countAverageRatingByUserId(id: string): Promise<any>;
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

  async getBatchByAuthorId(
    id: string,
    take: number,
    skip: number
  ): Promise<Post[]> {
    return await super.getMany({
      where: {
        author: {
          id: parseInt(id),
        },
      },
      take,
      skip,
      relations: this.defaultRelations,
    });
  }

  async updateRating(id: string, rating: number): Promise<unknown> {
    return await super.updateOne({ id: parseInt(id) }, { rating });
  }

  async countAverageRatingByUserId(id: string): Promise<any> {
    return await super.kostylAverageForSameColumnNameTables(
      {
        queryBuilderAlias: "Post",
        leftJoinAndSelectProperty: "Post.author",
        leftJoinAndSelectAlias: "author",
        selection: "Post.rating",
      },
      { author: { id: parseInt(id) } }
    );
  }
}
