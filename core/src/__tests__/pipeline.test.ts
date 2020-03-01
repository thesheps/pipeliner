import stage from "../stage";
import step from "../step";
import pipeline from "../pipeline";

describe("Pipeline", () => {
  it("can be named", () => {
    const pipelineName = "Test Pipeline";
    const testPipeline = pipeline(pipelineName);

    expect(testPipeline.name).toBe(pipelineName);
  });

  it("does not allow empty names", () => {
    expect(() => pipeline("")).toThrowError();
  });

  it("takes an array of stages", () => {
    const stageName = "Test Step";
    const testPipeline = pipeline("Test Pipeline", [stage(stageName)]);

    expect(testPipeline.stages[0].name).toBe(stageName);
  });

  it("executes each of the steps in turn", () => {
    const stepFn1 = jest.fn();
    const stepFn2 = jest.fn();
    const stepFn3 = jest.fn();
    const stepFn4 = jest.fn();
    const stepFn5 = jest.fn();
    const stepFn6 = jest.fn();

    const testPipeline = pipeline("Test Pipeline", [
      stage("Test Stage 1", [
        step("Test Step 1", stepFn1),
        step("Test Step 2", stepFn2),
        step("Test Step 3", stepFn3)
      ]),

      stage("Test Stage 2", [
        step("Test Step 4", stepFn4),
        step("Test Step 5", stepFn5),
        step("Test Step 6", stepFn6)
      ])
    ]);

    testPipeline.execute();

    expect(stepFn1).toHaveBeenCalledBefore(stepFn2);
    expect(stepFn2).toHaveBeenCalledBefore(stepFn3);
    expect(stepFn3).toHaveBeenCalledBefore(stepFn4);
    expect(stepFn4).toHaveBeenCalledBefore(stepFn5);
    expect(stepFn5).toHaveBeenCalledBefore(stepFn6);
  });
});
