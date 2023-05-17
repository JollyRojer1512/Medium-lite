import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { Symbols } from "../../../../dependencies/symbols";
import { Post } from "../../../../components/models/main/post";
import { PostService } from "../../../../architecture/service/main/post";

export type PostGetAllByUserUsecaseQueryInput = {
  id: string;
};
export type PostGetAllByUserUsecaseBodyInput = {};
type PostGetAllByUserUsecaseOutput = {
  posts: Post[];
};

export interface PostGetAllByUserUsecase {
  execute(
    context: Context<
      PostGetAllByUserUsecaseBodyInput,
      PostGetAllByUserUsecaseQueryInput
    >
  ): Promise<PostGetAllByUserUsecaseOutput>;
}

@injectable()
export class PostGetAllByUserUsecaseImpl implements PostGetAllByUserUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.Post)
    private readonly postService: PostService
  ) {}

  async execute(
    context: Context<
      PostGetAllByUserUsecaseBodyInput,
      PostGetAllByUserUsecaseQueryInput
    >
  ): Promise<PostGetAllByUserUsecaseOutput> {
    const posts = await this.postService.getAllByUserId(context.queryParams.id);
    return { posts };
  }
}
