import { User } from "./main/user";
import { TableNames } from "./types";
import { Post } from "./main/post";
import { Review } from "./main/review";

export const dbEntities = {
  main: {
    [TableNames.users]: User,
    [TableNames.posts]: Post,
    [TableNames.reviews]: Review,
  },
};
