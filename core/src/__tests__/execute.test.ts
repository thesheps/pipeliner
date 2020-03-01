import execute from "../execute";
import stage from "../stage";
import { Step } from "../step";

const executeFn = jest.fn();

jest.mock("../pipeline", () => ({
  default: () => ({ execute: executeFn })
}));

jest.mock("../stage");

describe("Execute", () => {
  it("loads the specified pipeline and stages", () => {
    execute({ pipeline: "../examples/testPipeline.ts" });

    expect(executeFn).toHaveBeenCalled();
    expect(stage).toHaveBeenCalledWith("Stage 1", [expect.any(Step)]);
  });
});
