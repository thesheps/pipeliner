import { exec } from "child_process";
import { existsSync } from "fs";

import { Step } from "./step";

export class Script extends Step {
  constructor(name: string, script: string) {
    super(name, () => {
      this.execute(script);
    });
  }

  private execute(script: string) {
    if (!existsSync(script))
      throw new Error("The specified script does not exist!");

    exec(script);
  }
}

export const script = (name: string, script: string) =>
  new Script(name, script);
