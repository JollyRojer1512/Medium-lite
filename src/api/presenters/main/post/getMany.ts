import { Post, PostPresenter } from "../../../../components/models/main/post";
import { Context } from "../../../../components/server/context";
import { injectable } from "inversify";

type PostGetManyPresenterInput = {
  posts: Post[];
};

export type PostGetManyPresenterOutput = {
  posts: PostPresenter[];
};

export interface PostGetManyPresenter {
  format(
    context: Context<unknown, unknown>,
    params: PostGetManyPresenterInput
  ): PostGetManyPresenterOutput;
}

@injectable()
export class PostGetManyPresenterImpl implements PostGetManyPresenter {
  format(
    context: Context<unknown, unknown>,
    params: PostGetManyPresenterInput
  ): PostGetManyPresenterOutput {
    const posts = params.posts.map((post) => post.presenter());
    return { posts };
  }
}
