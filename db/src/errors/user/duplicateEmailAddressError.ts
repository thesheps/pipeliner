import { UserError } from "./userError";

export class DuplicateEmailAddressError extends UserError {
  constructor(emailAddress: string) {
    super(`A user with the email address ${emailAddress} already exists!`);
    this.name = "DuplicateEmailAddressError";
  }
}
