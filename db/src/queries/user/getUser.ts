import { User, UserModel } from "../../models/user";
import { BadPasswordError } from "../../errors";

export const getUser = async (
  emailAddress: string,
  password: string
): Promise<User> => {
  const user = await UserModel.findOne({ where: { emailAddress } });
  if (!user.isValidPassword(password)) throw new BadPasswordError();

  return user;
};
