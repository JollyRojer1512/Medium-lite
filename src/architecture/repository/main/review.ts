import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { Db } from "../../../components/db";
import { Review } from "../../../components/models/main/review";
import { TableNames } from "../../../components/models/types";
import { BaseRepository } from "../base";
import { FindOptionsRelations } from "typeorm/find-options/FindOptionsRelations";

export interface ReviewRepository {
  insertOne(entity: Review): Promise<Review>;

  getAllByPostId(id: string): Promise<Review[]>;

  countAverageRatingByPostId(id: string): Promise<number | undefined>;
}

@injectable()
export class ReviewRepositoryImpl
  extends BaseRepository<Review>
  implements ReviewRepository
{
  private readonly defaultRelations: FindOptionsRelations<Review> = {
    user: true,
    post: true,
  };

  constructor(@inject(Symbols.Infrastructure.Db) db: Db) {
    super({ table: db.main.getRepository(TableNames.reviews) });
  }

  override async insertOne(entity: Review): Promise<Review> {
    return await super.insertOne(entity);
  }

  async getAllByPostId(id: string): Promise<Review[]> {
    return await super.getMany({
      where: {
        post: {
          id: parseInt(id),
        },
      },
      relations: this.defaultRelations,
    });
  }

  async countAverageRatingByPostId(id: string): Promise<any> {
    return await super.kostylAverageForSameColumnNameTables(
      {
        queryBuilderAlias: "Review",
        leftJoinAndSelectProperty: "Review.post",
        leftJoinAndSelectAlias: "post",
        selection: "Review.rating",
      },
      { post: { id: parseInt(id) } }
    );
  }
}
