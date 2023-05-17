import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { ReviewRepository } from "../../repository/main/review";
import { Review, ReviewModel } from "../../../components/models/main/review";

type ReviewServiceCreateNewParams = Omit<ReviewModel, "id" | "createTime">;

export interface ReviewService {
  createNew(params: ReviewServiceCreateNewParams): Promise<Review>;

  countAverageRatingByPostId(id: string): Promise<Review[]>;
}

@injectable()
export class ReviewServiceImpl implements ReviewService {
  constructor(
    @inject(Symbols.Architecture.Repository.Main.Review)
    private readonly repository: ReviewRepository
  ) {}

  async createNew(params: ReviewServiceCreateNewParams): Promise<Review> {
    const entity = new Review();
    entity.rating = params.rating;
    entity.post = params.post;
    entity.user = params.user;
    return await this.repository.insertOne(entity);
  }

  async countAverageRatingByPostId(id: string): Promise<Review[]> {
    return await this.repository.getAllByPostId(id);
  }
}
