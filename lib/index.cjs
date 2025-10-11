/**
 * CommonJS wrapper for ejsc-views
 *
 * This allows the package to be used with require() in CommonJS projects
 * while the main code remains as ES modules.
 */

// Dynamic import of the ES module
const loadModule = async () => {
  const module = await import('./index.js');
  return module;
};

// Synchronous wrapper for compile function
let cachedModule = null;

function compile(viewsDir = "views", outputDir = "public/js", details = false, cwd = process.cwd()) {
  if (cachedModule) {
    return cachedModule.compile(viewsDir, outputDir, details, cwd);
  }

  // For synchronous usage, we need to load the module first
  throw new Error(
    'Please use async/await when requiring ejsc-views:\n' +
    '  const { compile } = await import("ejsc-views");\n' +
    'Or use the async compile:\n' +
    '  const ejsc = require("ejsc-views");\n' +
    '  await ejsc.compileAsync();'
  );
}

// Async version that works with require()
async function compileAsync(viewsDir = "views", outputDir = "public/js", details = false, cwd = process.cwd()) {
  const module = await loadModule();
  cachedModule = module;
  return module.compile(viewsDir, outputDir, details, cwd);
}

// Pre-load the module for subsequent synchronous calls
loadModule().then(module => {
  cachedModule = module;
}).catch(err => {
  console.error('Failed to load ejsc-views module:', err);
});

module.exports = { compile, compileAsync };
