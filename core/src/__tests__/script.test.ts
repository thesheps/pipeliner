import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { when } from "jest-when";

import { logger } from "../logger";
import { script } from "../script";

jest.mock("fs");

jest.mock("../logger");

jest.mock("child_process", () => ({
  spawnSync: jest.fn().mockReturnValue({
    stdout: "STDOUT",
    error: "ERROR"
  })
}));

when(existsSync as jest.Mock)
  .calledWith("build.sh")
  .mockReturnValue(true);

when(existsSync as jest.Mock)
  .calledWith("doesnt-exist")
  .mockReturnValue(false);

describe("Script", () => {
  it("can be named", () => {
    const scriptName = "build";
    const testScript = script(scriptName, "");

    expect(testScript.name).toBe(scriptName);
  });

  it("does not allow empty names", () => {
    expect(() => script("", "")).toThrowError("Name cannot be empty!");
  });

  it("executes the specified script", () => {
    const scriptName = "build.sh";
    const testScript = script(scriptName, scriptName);
    testScript.func();

    expect(spawnSync).toHaveBeenCalledWith("sh", [scriptName]);
    expect(logger.info).toHaveBeenCalledWith("build.sh - STDOUT");
    expect(logger.error).toHaveBeenCalledWith("build.sh - ERROR");
  });

  it("checks for the presence of the script", () => {
    const scriptName = "doesnt-exist";
    const testScript = script(scriptName, scriptName);

    expect(() => testScript.func()).toThrowError();
  });
});
