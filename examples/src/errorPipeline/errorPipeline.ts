import { pipeline, stage, step } from "@pipeliner/core";

export default pipeline("My Test Pipeline", [
  stage("Stage 1", [
    step("Step 1", () => {
      throw new Error("IT'S ALIVE!!!");
    })
  ])
]);
