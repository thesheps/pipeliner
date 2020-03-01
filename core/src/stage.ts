import { Step } from "./step";

export class Stage {
  readonly name: string;
  readonly items: ReadonlyArray<Step | string>;

  constructor(name: string, items: (Step | string)[]) {
    if (!name) throw new Error("Stage Name cannot be empty!");

    this.name = name;
    this.items = items;
  }

  execute() {
    this.items.forEach(s => s instanceof Step && s.func());
  }
}

export default (name: string, items: (Step | string)[] = []): Stage =>
  new Stage(name, items);
