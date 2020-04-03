import { pipeline, stage, script } from "@pipeliner/core";

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
