import { ExecuteOptions } from "./executeOptions";
import { logWithDuration, logWithDurationAndThrow } from "./logger";
import { Loggable } from "./Loggable";
import { Step } from "./step";

export class Stage implements Loggable {
  readonly type = "Stage";
  readonly name: string;
  readonly items: ReadonlyArray<Step | string>;

  constructor(name: string, items?: (Step | string)[]) {
    if (!name) throw new Error("Stage Name cannot be empty!");

    this.name = name;
    this.items = items;
  }

  execute(options?: ExecuteOptions) {
    logWithDuration(this, () => {
      this.items.forEach(item => {
        if (item instanceof Step) {
          try {
            logWithDurationAndThrow(item, () => {
              options?.dryRun || item.func();
            });
          } catch (e) {
            throw new Error(
              `${this.name}: ${item.name} failed to complete (${e})`
            );
          }
        }
      });
    });
  }
}

export const stage = (name: string, items: (Step | string)[] = []) =>
  new Stage(name, items);
