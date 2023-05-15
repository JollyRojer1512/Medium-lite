import { User } from "./main/user";
import { TableNames } from "./types";

export const dbEntities = {
  main: {
    [TableNames.users]: User,
  },
};
