import axios from "axios";

import { UserService } from "../userService";

jest.mock("axios");

describe("UserService", () => {
  const baseUrl = "https://pipeliner.invalid";
  const username = "joe.bloggs";
  const emailAddress = "adam@joe.com";
  const password = "password";

  describe("registration", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("posts the provided details using axios", () => {
      const userService = new UserService(baseUrl);
      const registerUrl = `${baseUrl}/users/register`;

      userService.registerUser(username, emailAddress, password);

      expect(axios.post).toHaveBeenCalledWith(registerUrl, {
        username,
        emailAddress,
        password,
      });
    });

    it("returns whatever data is specified by the response", async () => {
      const userService = new UserService(baseUrl);
      (axios.post as jest.Mock).mockResolvedValueOnce({
        data: "beans-on-toast",
      });

      const token = await userService.registerUser(username, emailAddress, password);
      expect(token).toBe("beans-on-toast");
    });

    it("throws a lovely message if it b0rks", async () => {
      const expectedError = "Oh Noes!";
      const userService = new UserService(baseUrl);
      (axios.post as jest.Mock).mockRejectedValueOnce(new Error(expectedError));

      expect(
        userService.registerUser(username, emailAddress, password)
      ).rejects.toThrow(new Error(expectedError));
    });
  });
});
