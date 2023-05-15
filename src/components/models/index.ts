import { User } from "./main/user";
import { TableNames } from "./types";
import { Post } from "./main/post";

export const dbEntities = {
  main: {
    [TableNames.users]: User,
    [TableNames.posts]: Post,
  },
};
