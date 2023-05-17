import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { Post } from "../../../../components/models/main/post";
import { Symbols } from "../../../../dependencies/symbols";
import { PostService } from "../../../../architecture/service/main/post";

export type PostGetUsersPerPageUsecaseInput = {
  authorId: string;
  page: string;
  amount?: string;
};
type PostGetUsersPerPageUsecaseOutput = {
  posts: Post[];
};

export interface PostGetUsersPerPageUsecase {
  execute(
    context: Context<undefined, PostGetUsersPerPageUsecaseInput>
  ): Promise<PostGetUsersPerPageUsecaseOutput>;
}

@injectable()
export class PostGetUsersPerPageUsecaseImpl
  implements PostGetUsersPerPageUsecase
{
  private readonly defaultAmountPerPage = 20;

  constructor(
    @inject(Symbols.Architecture.Service.Main.Post)
    private readonly postService: PostService
  ) {}

  async execute(
    context: Context<undefined, PostGetUsersPerPageUsecaseInput>
  ): Promise<PostGetUsersPerPageUsecaseOutput> {
    const posts = await this.postService.getPageByUser(
      context.queryParams.authorId,
      parseInt(context.queryParams.page),
      context.queryParams.amount
        ? parseInt(context.queryParams.amount)
        : this.defaultAmountPerPage
    );
    return { posts };
  }
}
