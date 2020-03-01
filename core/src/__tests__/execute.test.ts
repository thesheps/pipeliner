import { execute } from "../execute";
import { stage } from "../stage";
import { Step } from "../step";

const executeFn = jest.fn();

jest.mock("../pipeline", () => ({
  pipeline: () => ({ execute: executeFn })
}));

jest.mock("../stage");

describe("Execute", () => {
  it("throws an exception if the pipeline is undefined", () => {
    expect(() => {
      execute({ pipeline: undefined });
    }).toThrowError("The pipeline is undefined!");
  });

  it("throws an exception if the pipeline does not exist", () => {
    expect(() => {
      execute({ pipeline: "unknown.pipeline" });
    }).toThrowError("Cannot find module 'unknown.pipeline' from 'execute.ts'");
  });

  it("loads the specified pipeline and stages", () => {
    execute({ pipeline: "../examples/testPipeline.ts" });

    expect(executeFn).toHaveBeenCalled();
    expect(stage).toHaveBeenCalledWith("Stage 1", [expect.any(Step)]);
  });
});
