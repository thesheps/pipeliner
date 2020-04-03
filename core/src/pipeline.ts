import { ExecuteOptions } from "./executeOptions";
import { logWithDuration } from "./logger";
import { Loggable } from "./Loggable";
import { Stage } from "./stage";

export class Pipeline implements Loggable {
  readonly type = "Pipeline";
  readonly name: string;
  readonly stages: ReadonlyArray<Stage>;

  constructor(name: string, stages?: Stage[]) {
    if (!name) throw new Error("Pipeline Name cannot be empty!");

    this.name = name;
    this.stages = stages;
  }

  execute(options?: ExecuteOptions) {
    logWithDuration(this, () => {
      try {
        this.stages.forEach(s => s.execute(options));
      } catch (e) {
        throw new Error(`Pipeliner Execution Halted - ${e}`);
      }
    });
  }
}

export const pipeline = (name: string, stages: Stage[] = []) =>
  new Pipeline(name, stages);
