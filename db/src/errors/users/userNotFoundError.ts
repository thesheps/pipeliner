import { UserError } from "./userError";

export class UserNotFoundError extends UserError {
  constructor(id: number) {
    super(`A user with the id ${id} could not be found!`);
    this.name = "UserNotFoundError";
  }
}
