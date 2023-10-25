#!/usr/bin/env node
/**
 * EJS Compiler
 *
 * Compile all views/*.ejs files into a single /public/js/views.js file
 */
import fs from "fs";
import { compile as __compile } from "ejs";
import { join } from "path";
import colors from "ansicolor";
colors.nice;

/**
 *
 * @param {*} view
 * @returns
 */
function c(view, details = false) {
  let v = view
    .replace(/\//g, "_")
    .replace(/-/g, "_")
    .replace(/\.ejs$/, "");

  if (details) {
    console.log(`|--- Compiling ${v}`.blue);
  }
  let template = new String(fs.readFileSync(view));
  let f = __compile(template, { client: true });

  let f_str = f.toString();

  f_str = f_str
    .replace("function anonymous(", "ejs." + v + " = function(")
    .replace(
      "function(locals, escapeFn, include, rethrow",
      "function(locals, escapeFn, include = ejs.views_include(locals), rethrow"
    );

  return f_str;
}

/**
 *
 * @param {*} views_dir default: views
 * @param {*} output_dir default: public/js
 * @param {*} details default: false
 */
function compile(
  views_dir = "views",
  output_dir = "public/js",
  details = false,
  cwd = process.cwd()
) {

  // do something line using fs : glob.readdirSync(join(cwd,views_dir, "**/*.ejs"))
  let compiled = fs
    .readdirSync(join(cwd, views_dir))
    .filter((f) => f.endsWith(".ejs"))
    .map((f) => join(cwd, views_dir, f))
    .map((f) => c(f, details))
    .join("\n");

  let output = `//EJS Compiled Views - This file was automatically generated on ${new Date()}
 ejs.views_include = function(locals) {
     ${details ? 'console.log("views_include_setup",locals);' : ''}
     return function(path, d) {
         console.log("ejs.views_include",path,d);
         return ejs["views_"+path.replace(/\\\//g,"_").replace(/-/g,"_")]({...d,...locals}, null, ejs.views_include(locals));
     }
 };
 ${compiled}`;

  if (!fs.existsSync(output_dir)) {
    fs.mkdirSync(output_dir);
  }
  fs.writeFileSync(join(cwd, output_dir, "views.js"), output);
  console.log((`\n|--- EJS Views successfully Compiled`).green);  
  console.log((`|--- ${join(cwd, output_dir, "views.js")}`).green);
}

const _compile = compile;
export { _compile as compile };
