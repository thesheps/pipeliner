import { existsSync } from "fs";
import { when } from "jest-when";

import { execute } from "../execute";

const executeFn = jest.fn();

jest.mock("fs");
jest.mock("../stage");
jest.mock("../pipeline", () => ({ pipeline: () => ({ execute: executeFn }) }));

when(existsSync as jest.Mock)
  .calledWith("../../../examples/errorPipeline")
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
      execute({ pipeline: undefined, workingDirectory: undefined });
    }).toThrowError("The working directory is undefined!");
  });

  it("throws an exception if the working directory does not exist", () => {
    expect(() => {
      execute({ pipeline: undefined, workingDirectory: "does-not-exist" });
    }).toThrowError("The working directory 'does-not-exist' does not exist!");
  });

  it("throws an exception if the pipeline is undefined", () => {
    expect(() => {
      execute({ pipeline: undefined, workingDirectory: "exists" });
    }).toThrowError("The pipeline is undefined!");
  });

  it("throws an exception if the pipeline does not exist", () => {
    expect(() => {
      execute({ pipeline: "unknown.pipeline", workingDirectory: "exists" });
    }).toThrowError(
      "Cannot find module 'exists/unknown.pipeline' from 'execute.ts'"
    );
  });
});
