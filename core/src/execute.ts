import { Config } from "./config";
import { Pipeline } from "./pipeline";

export default (config: Config) => {
  const pipeline = require(config.pipeline).default as Pipeline;
  pipeline.execute();
};
