import { User, UserModel } from "../../../models/user";
import { createUser } from "../../../commands";
import { getUser } from "..";

describe("getUser", () => {
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

  it("retrieves saved user by username and password", async () => {
    await createUser(expectedUser);
    const retrievedUser = await getUser(
      expectedUser.emailAddress,
      expectedUser.password
    );

    expect(retrievedUser.username).toEqual(expectedUser.username);
    expect(retrievedUser.emailAddress).toEqual(expectedUser.emailAddress);
  });

  it("throws BadPassword error if the password doesn't match", async () => {
    await createUser(expectedUser);

    await expect(
      getUser(
        expectedUser.emailAddress,
        "they're taking the hobbits to isengard"
      )
    ).rejects.toThrow("The provided password does not match our records!");
  });
});
