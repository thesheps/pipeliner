import { UserError } from "./userError";

export class DuplicateUsernameError extends UserError {
  constructor(username: string) {
    super(`A user with the username ${username} already exists!`);
    this.name = "DuplicateUsernameError";
  }
}
