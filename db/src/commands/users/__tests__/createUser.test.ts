import { User, UserModel } from "../../../models/user";
import { createUser } from "../createUser";

describe("createUser", () => {
  const expectedUser: User = {
    password: "password",
    emailAddress: "john.doe@invalid.com",
    username: "j_doe"
  };

  beforeEach(async () => {
    await UserModel.destroy({
      where: {},
      truncate: true
    });
  });

  it("saves user records", async () => {
    const user = await createUser(expectedUser);

    expect(user).toEqual(
      expect.objectContaining({
        ...expectedUser,
        password: expect.not.stringContaining(expectedUser.password),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
  });

  it("throws DuplicateEmailAddressError on duplicate email address", async () => {
    await createUser(expectedUser);

    await expect(
      createUser({ ...expectedUser, username: "bilbo" })
    ).rejects.toThrow({
      name: "DuplicateEmailAddressError",
      message: `A user with the email address ${expectedUser.emailAddress} already exists!`
    });
  });

  it("throws DuplicateUsernameError on duplicate username", async () => {
    await createUser(expectedUser);

    await expect(
      createUser({
        ...expectedUser,
        emailAddress: "jeff.bezos@amazon.invalid"
      })
    ).rejects.toThrow({
      name: "DuplicateUsernameError",
      message: `A user with the username ${expectedUser.username} already exists!`
    });
  });
});
