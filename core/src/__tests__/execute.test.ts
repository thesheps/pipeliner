import { existsSync } from "fs";
import { when } from "jest-when";

import { execute } from "../execute";
import { stage } from "../stage";
import { Step } from "../step";

const executeFn = jest.fn();

jest.mock("fs");
jest.mock("../stage");
jest.mock("../pipeline", () => ({ pipeline: () => ({ execute: executeFn }) }));

when(existsSync as jest.Mock)
  .calledWith("../../examples")
  .mockReturnValue(true);

when(existsSync as jest.Mock)
  .calledWith("exists")
  .mockReturnValue(true);

when(existsSync as jest.Mock)
  .calledWith("does-not-exist")
  .mockReturnValue(false);

describe("Execute", () => {
  it("throws an exception if the working directory is undefined", () => {
    expect(() => {
      execute(undefined, { pipeline: undefined });
    }).toThrowError("The working directory is undefined!");
  });

  it("throws an exception if the working directory does not exist", () => {
    expect(() => {
      execute("does-not-exist", { pipeline: undefined });
    }).toThrowError("The working directory 'does-not-exist' does not exist!");
  });

  it("throws an exception if the pipeline is undefined", () => {
    expect(() => {
      execute("exists", { pipeline: undefined });
    }).toThrowError("The pipeline is undefined!");
  });

  it("throws an exception if the pipeline does not exist", () => {
    expect(() => {
      execute("exists", { pipeline: "unknown.pipeline" });
    }).toThrowError(
      "Cannot find module 'exists/unknown.pipeline' from 'execute.ts'"
    );
  });

  it("loads the specified pipeline and stages", () => {
    execute("../../examples", { pipeline: "testPipeline.ts" });

    expect(executeFn).toHaveBeenCalled();
    expect(stage).toHaveBeenCalledWith("Stage 1", [expect.any(Step)]);
  });
});
