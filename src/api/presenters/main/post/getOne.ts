import { Post, PostPresenter } from "../../../../components/models/main/post";
import { Context } from "../../../../components/server/context";
import { injectable } from "inversify";

type PostGetOnePresenterInput = {
  post: Post;
};

export type PostGetOnePresenterOutput = {
  post: PostPresenter;
};

export interface PostGetOnePresenter {
  format(
    context: Context<unknown, unknown>,
    params: PostGetOnePresenterInput
  ): PostGetOnePresenterOutput;
}

@injectable()
export class PostGetOnePresenterImpl implements PostGetOnePresenter {
  format(
    context: Context<unknown, unknown>,
    params: PostGetOnePresenterInput
  ): PostGetOnePresenterOutput {
    const post = params.post.presenter();
    return { post };
  }
}
