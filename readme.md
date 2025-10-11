
# EJS Compiler CLI Tool

The **EJS Compiler** is a CLI tool for compiling `.ejs` templates into a single JavaScript file. This simplifies including precompiled views in your projects, improving efficiency and maintainability.

**Compatibility: Node 16.14.0 and later**

---

## Features

- Compiles all `.ejs` files, including nested ones, into a single JavaScript file.
- Supports detailed compilation logs for debugging and verification.
- Works cross-platform (Windows, macOS, Linux).
- Easy-to-use CLI interface or programmatic integration.
- Dual module support: Works with both ES Modules (import) and CommonJS (require).

---

## Installation

### 1. Install Globally 
To install globally for CLI usage:
```bash
npm install -g ejsc-views
```

### 2. Local Installation
For usage in a specific project programmatically:
```bash
npm install ejsc-views
```

---

## Usage

### **Method 1: CLI**

Run the compiler directly via the terminal.

#### Syntax:
```bash
ejsc [options]
```

#### Options:
| Option                 | Description                                         | Default         |
|------------------------|-----------------------------------------------------|-----------------|
| `-v, --views <views>`  | Directory containing `.ejs` templates.              | `views`         |
| `-o, --output <output>`| Directory for the compiled JavaScript output file.  | `public/js`     |
| `-d, --details`        | Display detailed logs during the compilation.       | Off             |
| `-h, --help`           | Display help for the CLI.                           | N/A             |

#### Examples:
1. Compile `.ejs` templates in `src/views` and save the output in `dist/js`:
   ```bash
   ejsc --views src/views --output dist/js
   ```

2. Compile with detailed logs enabled:
   ```bash
   ejsc --views src/views --output dist/js --details
   ```

---

### **Method 2: Programmatic Integration**

You can integrate the compiler into your Node.js scripts. The package supports both ES Modules (import) and CommonJS (require).

#### ES Modules (import):
```javascript
import { compile } from "ejsc-views";

const viewsDir = "src/views";
const outputDir = "dist/js";
const details = true; // Enable detailed logs

compile(viewsDir, outputDir, details);
```

#### CommonJS (require):
```javascript
const { compileAsync } = require("ejsc-views");

// Using async/await
(async () => {
  await compileAsync("src/views", "dist/js", true);
})();
```

**Note:** When using `require()`, you must use the `compileAsync()` function with async/await due to ES module loading requirements.

#### Parameters:
| Parameter     | Type    | Description                                         | Default         |
|---------------|---------|-----------------------------------------------------|-----------------|
| `viewsDir`    | String  | Directory containing `.ejs` templates.              | `"views"`       |
| `outputDir`   | String  | Directory for the compiled JavaScript output file.  | `"public/js"`   |
| `details`     | Boolean | Whether to display detailed logs during compilation.| `false`         |
| `cwd`         | String  | Working directory (optional).                       | `process.cwd()` |

---

## Output

The output is a single JavaScript file containing all compiled `.ejs` templates. By default, this file is saved as `public/js/views.js`.

The compiled file includes:
1. Precompiled views as functions.
2. A helper function `ejs.views_include` for including templates programmatically.

---


