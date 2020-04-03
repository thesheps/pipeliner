import { register } from "ts-node";
import { existsSync } from "fs";

import { ExecuteOptions } from "./executeOptions";
import { Config } from "./config";
import { Pipeline } from "./pipeline";

export const execute = (config: Config, options?: ExecuteOptions) => {
  if (!config.workingDirectory)
    throw new Error("The working directory is undefined!");
  if (!existsSync(config.workingDirectory))
    throw new Error(
      `The working directory '${config.workingDirectory}' does not exist!`
    );

  if (!config.pipeline) throw new Error("The pipeline is undefined!");

  register({ compilerOptions: { esModuleInterop: true } });

  const required = require(`${config.workingDirectory}/${config.pipeline}`);
  const pipeline = required.default as Pipeline;

  pipeline.execute(options);
};
