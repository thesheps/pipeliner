#!/usr/bin/env node

import program from "commander";
import { parse, execute } from "@pipeliner-dev/core";

program.option("-f, --file <filename>", "pipeliner file to execute");
program.parse(process.argv);

const config = parse(program.file);
execute(config);
