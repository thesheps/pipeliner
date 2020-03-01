import "jest-extended";

import stage from "../stage";
import step, { Step } from "../step";

describe("Stage", () => {
  it("can be named", () => {
    const stageName = "Test Stage";
    const testStage = stage(stageName);

    expect(testStage.name).toBe(stageName);
  });

  it("does not allow empty names", () => {
    expect(() => stage("")).toThrowError();
  });

  it("takes an array of steps", () => {
    const stepName = "Test Step";
    const testStage = stage("Test Stage", [step(stepName)]);

    expect((testStage.items[0] as Step).name).toBe(stepName);
  });

  it("executes each of the steps in turn", () => {
    const stepFn1 = jest.fn();
    const stepFn2 = jest.fn();
    const stepFn3 = jest.fn();

    const testStage = stage("Test Stage", [
      step("Test Step 1", stepFn1),
      step("Test Step 2", stepFn2),
      step("Test Step 3", stepFn3)
    ]);

    testStage.execute();

    expect(stepFn1).toHaveBeenCalledBefore(stepFn2);
    expect(stepFn2).toHaveBeenCalledBefore(stepFn3);
  });
});
