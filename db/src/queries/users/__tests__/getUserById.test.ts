import { User, UserModel } from "../../../models/user";
import { createUser } from "../../../commands";
import { getUserById } from "..";

describe("getUserById", () => {
  const expectedUser: User = {
    password: "password",
    emailAddress: "steve.buscemi@invalid.com",
    username: "s_buscemi"
  };

  beforeEach(async () => {
    await UserModel.destroy({
      where: {},
      truncate: true
    });
  });

  it("retrieves saved user by id", async () => {
    const user = await createUser(expectedUser);
    const retrievedUser = await getUserById(user.id);

    expect(retrievedUser.username).toEqual(expectedUser.username);
    expect(retrievedUser.emailAddress).toEqual(expectedUser.emailAddress);
  });

  it("throws UserNotFound error when id is unknown", async () => {
    await createUser(expectedUser);

    await expect(getUserById(666)).rejects.toThrow({
      name: "UserNotFound",
      message: `A user with the id 666 could not be found!`
    });
  });
});
