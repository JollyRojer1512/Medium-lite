import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { Post } from "../../../../components/models/main/post";
import { Symbols } from "../../../../dependencies/symbols";
import { PostService } from "../../../../architecture/service/main/post";
import { PostNotFound, UserNotFound } from "../../../../components/error/main";
import { ReviewService } from "../../../../architecture/service/main/review";
import { UserService } from "../../../../architecture/service/main/user";
import { ParamsDeclaration } from "../../base";

export const PostRateOneUsecaseParams: ParamsDeclaration<PostRateOneUsecaseBodyInput> =
  {
    rating: { type: Number },
    userId: { type: Number },
  };

export type PostRateOneUsecaseQueryInput = {
  postId: string;
};
export type PostRateOneUsecaseBodyInput = {
  rating: number;
  userId: number;
};
type PostRateOneUsecaseOutput = {
  post: Post;
};

export interface PostRateOneUsecase {
  execute(
    context: Context<PostRateOneUsecaseBodyInput, PostRateOneUsecaseQueryInput>
  ): Promise<PostRateOneUsecaseOutput>;
}

@injectable()
export class PostRateOneUsecaseImpl implements PostRateOneUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.Post)
    private readonly postService: PostService,
    @inject(Symbols.Architecture.Service.Main.Review)
    private readonly reviewService: ReviewService,
    @inject(Symbols.Architecture.Service.Main.User)
    private readonly userService: UserService
  ) {}

  async execute(
    context: Context<PostRateOneUsecaseBodyInput, PostRateOneUsecaseQueryInput>
  ): Promise<PostRateOneUsecaseOutput> {
    const user = await this.userService.getById(
      context.bodyParams.userId.toString()
    );
    if (!user) throw new UserNotFound();
    const post = await this.postService.getById(context.queryParams.postId);
    if (!post) throw new PostNotFound();
    await this.reviewService.createNew({
      post,
      user,
      rating: context.bodyParams.rating,
    });
    await this.postService.updateRating(post.id.toString());
    await this.userService.updateRating(user.id.toString());
    const updatedPost = await this.postService.getById(post.id.toString());
    if (!updatedPost) throw new PostNotFound();
    return { post: updatedPost };
  }
}
