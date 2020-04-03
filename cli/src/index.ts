import program from "commander";

import { parse, execute } from "@pipeliner/core";

program
  .command("parse <file>")
  .alias("p")
  .description("Performs a dry-run of the pipeliner file")
  .action(file => {
    const config = parse(file);
    execute(config, { dryRun: true });
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}
