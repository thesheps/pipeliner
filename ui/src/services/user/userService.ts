import axios from "axios";

export class UserService {
  private readonly baseUrl: string;

  private readonly registerUrl = () => `${this.baseUrl}/users/register`;
  private readonly signInUrl = () => `${this.baseUrl}/users/sign-in`;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async registerUser(
    username: string,
    emailAddress: string,
    password: string
  ): Promise<string> {
    try {
      const response = await axios.post(this.registerUrl(), {
        username,
        emailAddress,
        password,
      });

      const { data } = response;

      return data;
    } catch (error) {
      if (error.response?.data) throw new Error(error.response.data);

      throw error;
    }
  }

  async signInUser(emailAddress: string, password: string): Promise<string> {
    try {
      const response = await axios.post(this.signInUrl(), {
        emailAddress,
        password,
      });

      const { data } = response;

      return data;
    } catch (error) {
      if (error.response?.data) throw new Error(error.response.data);

      throw error;
    }
  }
}
