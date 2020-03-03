#!/usr/bin/env node

import program from "commander";
import { parse, execute } from "@pipeliner-dev/core";

program
  .command("parse <file>")
  .alias("p")
  .description("Performs a dry-run of the pipeliner file")
  .action(file => {
    execute(process.cwd(), parse(file));
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}
