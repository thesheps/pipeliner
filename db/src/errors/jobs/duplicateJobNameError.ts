import { JobError } from "./jobError";

export class DuplicateJobNameError extends JobError {
  constructor(name: string) {
    super(`A job with the name ${name} already exists!`);
    this.name = "DuplicateJobNameError";
  }
}
