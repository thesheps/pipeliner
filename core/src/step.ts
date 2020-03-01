export class Step {
  readonly name: string;
  readonly func: Function;

  constructor(name: string, func?: Function) {
    if (!name) throw new Error("Step Name cannot be empty!");

    this.name = name;
    this.func = func;
  }
}

export default (name: string, func: Function = () => {}) =>
  new Step(name, func);
