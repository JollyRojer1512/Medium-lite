import { inject, injectable } from "inversify";
import { Symbols } from "../../../dependencies/symbols";
import { PostRepository } from "../../repository/main/post";
import { Post, PostModel } from "../../../components/models/main/post";

type PostServiceCreateNewParams = Omit<PostModel, "id" | "create_time">;

export interface PostService {
  createNew(params: PostServiceCreateNewParams): Promise<Post>;
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
}
