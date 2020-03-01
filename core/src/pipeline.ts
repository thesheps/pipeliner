import { Stage } from "./stage";

export class Pipeline {
  readonly name: string;
  readonly stages: ReadonlyArray<Stage>;

  constructor(name: string, stages?: Stage[]) {
    if (!name) throw new Error("Pipeline Name cannot be empty!");

    this.name = name;
    this.stages = stages;
  }

  execute() {
    try {
      this.stages.forEach(s => s.execute());
    } catch (e) {
      throw new Error(`Pipeliner Execution Halted - ${e}`);
    }
  }
}

export const pipeline = (name: string, stages: Stage[] = []) =>
  new Pipeline(name, stages);
