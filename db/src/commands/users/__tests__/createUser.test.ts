import { User, UserModel } from "../../../models/user";
import { createUser } from "../createUser";

describe("createUser", () => {
  let user: User;

  let expectedUser: User = {
    password: "password",
    emailAddress: "john.doe@invalid.com",
    username: "j_doe",
  };

  beforeEach(async () => {
    user = await createUser(expectedUser);
  });

  afterEach(async () => {
    await UserModel.destroy({
      where: { id: user.id },
    });
  });

  it("saves user records", async () => {
    expect(user).toEqual(
      expect.objectContaining({
        ...expectedUser,
        password: expect.not.stringContaining(expectedUser.password),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it("throws DuplicateEmailAddressError on duplicate email address", async () => {
    await expect(
      createUser({ ...expectedUser, username: "bilbo" })
    ).rejects.toThrow({
      name: "DuplicateEmailAddressError",
      message: `A user with the email address ${expectedUser.emailAddress} already exists!`,
    });
  });

  it("throws DuplicateUsernameError on duplicate username", async () => {
    await expect(
      createUser({
        ...expectedUser,
        emailAddress: "jeff.bezos@amazon.invalid",
      })
    ).rejects.toThrow({
      name: "DuplicateUsernameError",
      message: `A user with the username ${expectedUser.username} already exists!`,
    });
  });
});
