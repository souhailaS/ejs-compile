/**
 * EJS Compiler Library
 *
 * Compile all views/*.ejs files (including nested ones) into a single /public/js/views.js file
 */
import fs from "fs";
import { compile as ejsCompile } from "ejs";
import { join, resolve, relative } from "path";
import { glob } from "glob";
import process from "process";

// Helper: Cross-platform path normalization
const normalizePath = (path) => path.replace(/\\/g, "/");

function compileView(view, viewsDir, details = false) {
  const relativePath = relative(viewsDir, view);

  const viewName = normalizePath(relativePath)
    .replace(/\//g, "_")
    .replace(/-/g, "_")
    .replace(/\.ejs$/, "");

  if (details) {
    console.log(`|--- Compiling ${viewName}`);
  }

  const template = fs.readFileSync(view, "utf8");
  const compiledFn = ejsCompile(template, { client: true });
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
export function compile(
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
      .map((file) => compileView(file, resolvedViewsDir, details))
      .join("\n");

    // Prepare the final output content
    const outputContent = `// EJS Compiled Views - Generated on ${new Date().toISOString()}
ejs.views_include = function(locals) {
  ${details ? 'console.log("views_include_setup", locals);' : ""}
  return function(path, d) {
    ${details ? 'console.log("ejs.views_include", path, d);' : ""}
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

    console.log(`\n|--- EJS Views successfully Compiled`);
    console.log(`|--- Output file: ${outputFile}`);
  } catch (error) {
    console.error(`\n|--- Compilation Failed: ${error.message}`);
    console.error(
      `|--- Ensure the "views" directory exists and contains .ejs files.`
    );
    throw error;
  }
}
