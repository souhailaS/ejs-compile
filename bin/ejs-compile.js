#!/usr/bin/env node
/**
 * EJS Compiler
 *
 * Compile all views/*.ejs files (including nested ones) into a single /public/js/views.js file
 */
import fs from "fs";
import { compile as __compile } from "ejs";
import { join, resolve } from "path";
import { glob } from "glob";
import colors from "ansicolor";
import process from "process";
colors.nice;

// Helper: Cross-platform path normalization
const normalizePath = (path) => path.replace(/\\/g, "/");

// Helper: Compile a single view
function compileView(view, details = false) {
  const viewName = normalizePath(view)
    .replace(/\//g, "_")
    .replace(/-/g, "_")
    .replace(/\.ejs$/, "");

  if (details) {
    console.log(`|--- Compiling ${viewName}`.blue);
  }

  const template = fs.readFileSync(view, "utf8");
  const compiledFn = __compile(template, { client: true });
  let compiledStr = compiledFn.toString();

  // Adjust the compiled function
  compiledStr = compiledStr
    .replace("function anonymous(", `ejs.${viewName} = function(`)
    .replace(
      "function(locals, escapeFn, include, rethrow",
      "function(locals, escapeFn, include = ejs.views_include(locals), rethrow"
    );

  return compiledStr;
}

// Main Compiler Function
function compileEJS(
  viewsDir = "views",
  outputDir = "public/js",
  details = false,
  cwd = process.cwd()
) {
  const resolvedViewsDir = resolve(cwd, viewsDir);
  const resolvedOutputDir = resolve(cwd, outputDir);

  try {
    // Find all .ejs files, including nested ones
    const files = glob.sync(`${resolvedViewsDir}/**/*.ejs`);

    if (files.length === 0) {
      throw new Error(`No .ejs files found in ${resolvedViewsDir}`);
    }

    const compiledTemplates = files
      .map((file) => compileView(file, details))
      .join("\n");

    // Prepare the final output content
    const outputContent = `// EJS Compiled Views - Generated on ${new Date().toISOString()}
ejs.views_include = function(locals) {
  ${details ? 'console.log("views_include_setup", locals);' : ""}
  return function(path, d) {
    console.log("ejs.views_include", path, d);
    return ejs["views_" + path.replace(/\\//g, "_").replace(/-/g, "_")](
      { ...d, ...locals },
      null,
      ejs.views_include(locals)
    );
  };
};
${compiledTemplates}`;

    // Ensure output directory exists
    if (!fs.existsSync(resolvedOutputDir)) {
      fs.mkdirSync(resolvedOutputDir, { recursive: true });
    }

    // Write the compiled file
    const outputFile = join(resolvedOutputDir, "views.js");
    fs.writeFileSync(outputFile, outputContent, "utf8");

    console.log(`\n|--- EJS Views successfully Compiled`.green);
    console.log(`|--- Output file: ${outputFile}`.green);
  } catch (error) {
    console.error(`\n|--- Compilation Failed: ${error.message}`.red);
    console.error(
      `|--- Ensure the "views" directory exists and contains .ejs files.`.red
    );
  }
}

// CLI Support
function parseCLIArgs() {
  const args = process.argv.slice(2);
  const options = {
    viewsDir: "views",
    outputDir: "public/js",
    details: false,
  };

  args.forEach((arg) => {
    if (arg.startsWith("--views=")) {
      options.viewsDir = arg.split("=")[1];
    } else if (arg.startsWith("--output=")) {
      options.outputDir = arg.split("=")[1];
    } else if (arg === "--details") {
      options.details = true;
    }
  });

  return options;
}

// Main Entry Point
if (import.meta.url === `file://${process.argv[1]}`) {
  const { viewsDir, outputDir, details } = parseCLIArgs();
  compile(viewsDir, outputDir, details);
}

// Export for programmatic usage
export { compileEJS as compile };