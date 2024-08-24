#!/usr/bin/env node

import { listTemplate } from "../lib/commands/list.js";
import { Command } from "commander";
import { useTemplate } from "../lib/commands/use.js";
import chalk from "chalk";
const program = new Command();

program
  .version("1.0.0")
  .description("A CLI tool for frontend development boilerplates");

// Define the `list` command
program
  .command("list")
  .alias("ls")
  .description("List all available boilerplates")
  .action(() => {
    listTemplate();
  });

// Define the `use` command
program
  .command("use [template]")
  .description("Use a specific boilerplate")
  .action((template) => {
    useTemplate(template);
  });


program.parse(process.argv);