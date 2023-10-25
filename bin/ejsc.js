#!/usr/bin/env node --no-warnings
/**
* CLI Usage: ejsc --views [views_dir] --output [output_dir]
*/
import { compile } from "./ejs-compile.js";
import { Command } from 'commander';
const program = new Command();
import pkg from "../package.json" assert { type: "json" };
import colors from "ansicolor";
colors.nice;

program
    .version(pkg.version)
    .description('Compile all views/*.ejs files into a single /public/js/views.js file')
    .option('-v, --views <views_dir>', 'views directory', 'views')
    .option('-o, --output <output_dir>', 'output directory', 'public/js')
    .option('-d, --details', 'display the compiled views')
    .action((options) => {
        compile(options.views, options.output, options.details, process.cwd());
    });

program.parse(process.argv); 



const _compile = compile;
export { _compile as compile };
