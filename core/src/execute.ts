import { register } from "ts-node";
import { existsSync } from "fs";

import { Config } from "./config";
import { Pipeline } from "./pipeline";

export const execute = (workingDirectory: string, config: Config) => {
  if (!workingDirectory) throw new Error("The working directory is undefined!");
  if (!existsSync(workingDirectory))
    throw new Error(
      `The working directory '${workingDirectory}' does not exist!`
    );

  if (!config.pipeline) throw new Error("The pipeline is undefined!");

  register({ compilerOptions: { esModuleInterop: true } });

  const required = require(`${workingDirectory}/${config.pipeline}`);
  const pipeline = required.default as Pipeline;

  pipeline.execute();
};
