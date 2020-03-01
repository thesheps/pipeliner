import { Config } from "./config";
import { Pipeline } from "./pipeline";

export default (config: Config) => {
  if (!config.pipeline) throw new Error("The pipeline is undefined!");

  const pipeline = require(config.pipeline).default as Pipeline;
  pipeline.execute();
};
