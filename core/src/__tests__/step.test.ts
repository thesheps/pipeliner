import { step } from "../step";

describe("Step", () => {
  it("can be named", () => {
    const stepName = "build";
    const testStep = step(stepName);

    expect(testStep.name).toBe(stepName);
  });

  it("does not allow empty names", () => {
    expect(() => step("")).toThrowError();
  });

  it("takes a function which defines the step", () => {
    const testFunction = () => {};
    const testStep = step("Test Step", testFunction);

    expect(testStep.func).toBe(testFunction);
  });
});
