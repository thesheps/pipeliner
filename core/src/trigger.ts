import { Step } from "./step";
import { Pipeline } from "./pipeline";

export class Trigger extends Step {
  readonly pipeline: Pipeline;

  constructor(name: string, pipeline: Pipeline) {
    super(name, () => {
      pipeline.execute();
    });

    this.pipeline = pipeline;
  }
}

export const trigger = (name: string, pipeline: Pipeline) =>
  new Trigger(name, pipeline);
