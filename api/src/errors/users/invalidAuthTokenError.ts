import { AuthError } from "./authError";

export class InvalidAuthTokenError extends AuthError {
  constructor() {
    super("The specified authentication token is invalid!");
    this.name = "InvalidAuthTokenError";
  }
}
