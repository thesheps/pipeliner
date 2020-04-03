import { UserError } from "./userError";

export class BadPasswordError extends UserError {
  constructor() {
    super("The provided password does not match our records!");
    this.name = "BadPasswordError";
  }
}
