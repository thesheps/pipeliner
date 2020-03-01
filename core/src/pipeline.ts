import { Stage } from "./stage";

/** Pipeline Class
 *  Top-level construct, provides functionality to execute nested stages.
 */
export class Pipeline {
  readonly name: string;
  readonly stages: ReadonlyArray<Stage>;

  constructor(name: string, stages: Stage[]) {
    if (!name) throw new Error("Pipeline Name cannot be empty!");

    this.name = name;
    this.stages = stages;
  }

  execute() {
    this.stages.forEach(s => s.execute());
  }
}

export default (name: string, stages: Stage[] = []): Pipeline =>
  new Pipeline(name, stages);
