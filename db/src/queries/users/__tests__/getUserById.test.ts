import { User, UserModel } from "../../../models/user";
import { createUser } from "../../../commands";
import { getUserById } from "..";

describe("getUserById", () => {
  let id: number;

  const expectedUser: User = {
    password: "password",
    emailAddress: "steve.buscemi@invalid.com",
    username: "s_buscemi",
  };

  beforeEach(async () => {
    id = (await createUser(expectedUser)).id;
  });

  afterEach(async () => {
    await UserModel.destroy({
      where: { id: id },
    });
  });

  it("retrieves saved user by id", async () => {
    const retrievedUser = await getUserById(id);

    expect(retrievedUser.username).toEqual(expectedUser.username);
    expect(retrievedUser.emailAddress).toEqual(expectedUser.emailAddress);
  });

  it("throws UserNotFound error when id is unknown", async () => {
    await expect(getUserById(666)).rejects.toThrow({
      name: "UserNotFound",
      message: `A user with the id 666 could not be found!`,
    });
  });
});
