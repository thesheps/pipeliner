import { pipeline } from "../../core/src/pipeline";
import { stage } from "../../core/src/stage";
import { step } from "../../core/src/step";

export default pipeline("My Test Pipeline", [
  stage("Stage 1", [
    step("Step 1", () => {
      throw new Error("IT'S ALIVE!!!");
    })
  ])
]);
