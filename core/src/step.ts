export class Step {
  readonly name: string;
  readonly func: Function;

  constructor(name: string, func?: Function) {
    if (!name) throw new Error("Name cannot be empty!");

    this.name = name;
    this.func = func;
  }
}

export const step = (name: string, func: Function = () => {}) =>
  new Step(name, func);
