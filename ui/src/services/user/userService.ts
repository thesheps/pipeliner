import axios from "axios";

export class UserService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<string> {
    const response = await axios.post(this.baseUrl, {
      username,
      email,
      password
    });

    const { data } = response;

    return data;
  }
}
