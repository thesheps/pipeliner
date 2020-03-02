import { logger, logWithDuration, logWithDurationAndThrow } from "./logger";
import { Step } from "./step";

export class Stage {
  readonly name: string;
  readonly items: ReadonlyArray<Step | string>;

  constructor(name: string, items?: (Step | string)[]) {
    if (!name) throw new Error("Stage Name cannot be empty!");

    this.name = name;
    this.items = items;
  }

  execute() {
    logWithDuration(`Executing Stage '${this.name}'...`, () => {
      this.items.forEach(s => {
        if (s instanceof Step) {
          try {
            logWithDurationAndThrow(`Executing Step '${s.name}'...`, () => {
              s.func();
            });
          } catch (e) {
            throw new Error(
              `${this.name}: ${s.name} failed to complete (${e})`
            );
          }
        }
      });
    });
  }
}

export const stage = (name: string, items: (Step | string)[] = []) =>
  new Stage(name, items);
