import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { Symbols } from "../../../../dependencies/symbols";
import { Post } from "../../../../components/models/main/post";
import { PostService } from "../../../../architecture/service/main/post";

export type PostGetAllByUserUsecaseInput = {
  id: string;
};
type PostGetAllByUserUsecaseOutput = {
  posts: Post[];
};

export interface PostGetAllByUserUsecase {
  execute(
    context: Context<undefined, PostGetAllByUserUsecaseInput>
  ): Promise<PostGetAllByUserUsecaseOutput>;
}

@injectable()
export class PostGetAllByUserUsecaseImpl implements PostGetAllByUserUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.Post)
    private readonly postService: PostService
  ) {}

  async execute(
    context: Context<undefined, PostGetAllByUserUsecaseInput>
  ): Promise<PostGetAllByUserUsecaseOutput> {
    const posts = await this.postService.getAllByUserId(context.queryParams.id);
    return { posts };
  }
}
