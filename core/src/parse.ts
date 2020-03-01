import { readFileSync } from "fs";

export const parse = (filename: string) => {
  try {
    const fileContents = readFileSync(filename);
    const text = fileContents.toString();
    return JSON.parse(text);
  } catch {
    throw new Error(
      `The specified pipeliner file ${filename} cannot be opened!`
    );
  }
};
