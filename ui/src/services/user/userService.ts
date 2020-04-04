import axios from "axios";

export class UserService {
  private readonly baseUrl: string;

  private readonly registerUrl = () => `${this.baseUrl}/users/register`;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async registerUser(
    username: string,
    emailAddress: string,
    password: string
  ): Promise<string> {
    const response = await axios.post(this.registerUrl(), {
      username,
      emailAddress,
      password,
    });

    const { data } = response;

    return data;
  }
}
