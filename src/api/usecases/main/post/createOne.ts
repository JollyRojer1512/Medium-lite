import { inject, injectable } from "inversify";
import { Context } from "../../../../components/server/context";
import { Post } from "../../../../components/models/main/post";
import { Symbols } from "../../../../dependencies/symbols";
import { PostService } from "../../../../architecture/service/main/post";
import { ParamsDeclaration } from "../../types";
import { UserService } from "../../../../architecture/service/main/user";
import { UserNotFound } from "../../../../components/error/main";

export const PostCreateOneUsecaseParams: ParamsDeclaration<PostCreateOneUsecaseInput> =
  {
    authorId: { type: Number },
    title: { type: String },
    content: { type: String },
  };

export type PostCreateOneUsecaseInput = {
  authorId: number;
  title: string;
  content: string;
};
type PostCreateOneUsecaseOutput = {
  post: Post;
};

export interface PostCreateOneUsecase {
  execute(
    context: Context<PostCreateOneUsecaseInput, undefined>
  ): Promise<PostCreateOneUsecaseOutput>;
}

@injectable()
export class PostCreateOneUsecaseImpl implements PostCreateOneUsecase {
  constructor(
    @inject(Symbols.Architecture.Service.Main.User)
    private readonly userService: UserService,
    @inject(Symbols.Architecture.Service.Main.Post)
    private readonly postService: PostService
  ) {}

  async execute(
    context: Context<PostCreateOneUsecaseInput, undefined>
  ): Promise<PostCreateOneUsecaseOutput> {
    const user = await this.userService.getById(
      context.bodyParams.authorId.toString()
    );
    if (!user) throw new UserNotFound();
    const post = await this.postService.createNew({
      title: context.bodyParams.title,
      content: context.bodyParams.content,
      author: user,
    });
    return { post };
  }
}
