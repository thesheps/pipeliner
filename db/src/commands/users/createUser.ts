import { User, UserModel } from "../../models/user";
import {
  DuplicateEmailAddressError,
  DuplicateUsernameError
} from "../../errors/users";

export const createUser = async (user: User): Promise<User> => {
  try {
    return await UserModel.create(user);
  } catch (error) {
    if (error.name !== "SequelizeUniqueConstraintError") throw error;

    if (error.errors[0].path === "emailAddress")
      throw new DuplicateEmailAddressError(user.emailAddress);

    if (error.errors[0].path === "username")
      throw new DuplicateUsernameError(user.username);
  }
};
