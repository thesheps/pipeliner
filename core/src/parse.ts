import { readFileSync } from "fs";

import { Config } from "./config";

export const parse = (filename: string): Config => {
  try {
    const fileContents = readFileSync(filename);
    const text = fileContents.toString();
    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      `The specified pipeliner file ${filename} cannot be opened - ${error.message}`
    );
  }
};
