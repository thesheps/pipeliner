import { Stage } from "./stage";

export class Pipeline {
  readonly name: string;
  readonly stages: ReadonlyArray<Stage>;

  constructor(name: string, stages?: Stage[]) {
    if (!name) throw new Error("Pipeline Name cannot be empty!");

    this.name = name;
    this.stages = stages;

    this.execute();
  }

  execute() {
    this.stages.forEach(s => s.execute());
  }
}

export default (name: string, stages: Stage[] = []) =>
  new Pipeline(name, stages);
