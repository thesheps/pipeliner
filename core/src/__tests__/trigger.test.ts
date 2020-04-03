import { trigger } from "../trigger";
import { Pipeline } from "../pipeline";

describe("Trigger", () => {
  it("does not allow empty names", () => {
    expect(() => trigger("", new Pipeline(""))).toThrowError();
  });

  it("takes a pipeline which defines the step", () => {
    const nextPipeline = new Pipeline("Deploy");
    const testTrigger = trigger("Test Step", nextPipeline);

    expect(testTrigger.pipeline).toBe(nextPipeline);
  });
});
