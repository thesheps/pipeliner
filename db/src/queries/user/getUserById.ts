import { User, UserModel } from "../../models";
import { UserNotFoundError } from "../../errors/user/userNotFoundError";

export const getUserById = async (id: number): Promise<User> => {
  const user = await UserModel.findByPk(id);
  if (!user) throw new UserNotFoundError(id);

  return user;
};
