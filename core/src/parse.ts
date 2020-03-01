import { readFileSync } from "fs";

export default (filename: string) => {
  const contents = readFileSync(filename).toString();
  return JSON.parse(contents);
};
