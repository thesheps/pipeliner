import pipeline from "../src/pipeline";
import stage from "../src/stage";
import step from "../src/step";

export default pipeline("My Test Pipeline", [
  stage("Stage 1", [step("Step 1", () => {})])
]);
