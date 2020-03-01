import { readFileSync } from "fs";
import { when } from "jest-when";

import parse from "../parse";

const existingFilename = "pipeliner.json";
const missingFilename = "missing.json";
const invalidFilename = "invalid.json";
const pipelinerFile = '{ "pipeline": "myPipeline.ts" }';

jest.mock("fs");

when(readFileSync as jest.Mock)
  .calledWith(existingFilename)
  .mockReturnValue(Buffer.from(pipelinerFile, "utf-8"));

when(readFileSync as jest.Mock)
  .calledWith(invalidFilename)
  .mockReturnValue(Buffer.from("I AM NAUGHTY", "utf-8"));

when(readFileSync as jest.Mock)
  .calledWith(missingFilename)
  .mockImplementation(() => {
    throw new Error();
  });

describe("Parse", () => {
  it("parses an existing config file", () => {
    const config = parse(existingFilename);
    expect(config.pipeline).toBe("myPipeline.ts");
  });

  it("throws on a missing config file", () => {
    expect(() => parse(missingFilename)).toThrowError(
      `The specified pipeliner file ${missingFilename} cannot be opened!`
    );
  });

  it("throws on an invalid config file", () => {
    expect(() => parse(invalidFilename)).toThrowError(
      `The specified pipeliner file ${invalidFilename} cannot be opened!`
    );
  });
});
