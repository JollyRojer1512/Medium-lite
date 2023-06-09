import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { Post } from "../../../../components/models/main/post";
import { Symbols } from "../../../../dependencies/symbols";
import { PostService } from "../../../../architecture/service/main/post";
import { PostNotFound } from "../../../../components/error/main";

export type PostGetOneUsecaseQueryInput = {
  id: string;
};
export type PostGetOneUsecaseBodyInput = {};
type PostGetOneUsecaseOutput = {
  post: Post;
};

export interface PostGetOneUsecase {
  execute(
    context: Context<PostGetOneUsecaseBodyInput, PostGetOneUsecaseQueryInput>
  ): Promise<PostGetOneUsecaseOutput>;
}

@injectable()
export class PostGetOneUsecaseImpl implements PostGetOneUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.Post)
    private readonly postService: PostService
  ) {}

  async execute(
    context: Context<PostGetOneUsecaseBodyInput, PostGetOneUsecaseQueryInput>
  ): Promise<PostGetOneUsecaseOutput> {
    const post = await this.postService.getById(context.queryParams.id);
    if (!post) throw new PostNotFound();
    return { post };
  }
}
