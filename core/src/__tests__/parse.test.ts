import { readFileSync } from "fs";
import { when } from "jest-when";

import parse from "../parse";

const pipelinerFilename = "pipeliner.json";
const pipelinerFile = '{ "pipeline": "myPipeline.ts" }';

jest.mock("fs");

when(readFileSync as jest.Mock)
  .calledWith(pipelinerFilename)
  .mockReturnValue(Buffer.from(pipelinerFile, "utf-8"));

describe("Parse", () => {
  it("parses a config file", () => {
    const config = parse(pipelinerFilename);
    expect(config.pipeline).toBe("myPipeline.ts");
  });
});
