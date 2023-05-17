import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { PostRepository } from "../../repository/main/post";
import { Post, PostModel } from "../../../components/models/main/post";

type PostServiceCreateNewParams = Omit<PostModel, "id" | "createTime">;

export interface PostService {
  createNew(params: PostServiceCreateNewParams): Promise<Post>;

  getAllByUserId(id: string): Promise<Post[]>;

  getById(id: string): Promise<Post | undefined>;

  getPageByUser(userId: string, page: number, amount: number): Promise<Post[]>;
}

@injectable()
export class PostServiceImpl implements PostService {
  constructor(
    @inject(Symbols.Architecture.Repository.Main.Post)
    private readonly repository: PostRepository
  ) {}

  async createNew(params: PostServiceCreateNewParams): Promise<Post> {
    const entity = new Post();
    entity.title = params.title;
    entity.content = params.content;
    entity.author = params.author;
    return await this.repository.insertOne(entity);
  }

  async getAllByUserId(id: string): Promise<Post[]> {
    return await this.repository.getAllByUserId(id);
  }

  async getById(id: string): Promise<Post | undefined> {
    return await this.repository.getById(id);
  }

  async getPageByUser(
    userId: string,
    page: number,
    amount: number
  ): Promise<Post[]> {
    const skip = amount * (page - 1);
    return await this.repository.getBatchByAuthorId(userId, amount, skip);
  }
}
