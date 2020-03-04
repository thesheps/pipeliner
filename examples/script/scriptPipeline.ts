import { pipeline } from "../../core/src/pipeline";
import { stage } from "../../core/src/stage";
import { script } from "../../core/src/script";

export default pipeline("Scripted Pipeline", [
  stage("Execute First Scripts", [
    script("Run Script A", "script-a.sh"),
    script("Run Script B", "script-b.sh")
  ]),

  stage("Execute Second Scripts", [
    script("Run Script C", "script-c.sh"),
    script("Run Script D", "script-d.sh")
  ])
]);
