#!/usr/bin/env node --no-warnings
/**
 * CLI Usage: ejsc --views [views_dir] --output [output_dir] --details
 */

import { compile } from "./ejs-compile.js";
import { Command } from "commander";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import colors from "ansicolor";
colors.nice;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf8"));

// Initialize Commander.js
const program = new Command();

program
  .version(pkg.version)
  .description(
    "Compile all views/*.ejs files (including nested ones) into a single /public/js/views.js file"
  )
  .option("-v, --views <views_dir>", "views directory", "views")
  .option("-o, --output <output_dir>", "output directory", "public/js")
  .option("-d, --details", "display detailed compilation logs")
  .action((options) => {
    try {
      compile(options.views, options.output, options.details, process.cwd());
    } catch (error) {
      console.error(`\n|--- Compilation Failed: ${error.message}`.red);
    }
  });

program.parse(process.argv);

// Export for testing or programmatic usage
const _compile = compile;
export { _compile as compile };