
# EJS Compiler CLI Tool

The **EJS Compiler** is a CLI tool for compiling `.ejs` templates into a single JavaScript file. This simplifies including precompiled views in your projects, improving efficiency and maintainability.

---

## Features

- Compiles all `.ejs` files, including nested ones, into a single JavaScript file.
- Supports detailed compilation logs for debugging and verification.
- Works cross-platform (Windows, macOS, Linux).
- Easy-to-use CLI interface or programmatic integration.

---

## Installation

### 1. Install Globally (via npm)
To install globally for CLI usage:
```bash
npm install -g .
```

### 2. Local Installation
For usage in a specific project:
```bash
npm install <path-to-tool>
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

You can integrate the compiler into your Node.js scripts.

#### Example Code:
```javascript
import { compile } from "ejs-compile";

const viewsDir = "src/views";
const outputDir = "dist/js";
const details = true; // Enable detailed logs

compile(viewsDir, outputDir, details);
```

#### Parameters:
| Parameter     | Type    | Description                                         | Default         |
|---------------|---------|-----------------------------------------------------|-----------------|
| `viewsDir`    | String  | Directory containing `.ejs` templates.              | `"views"`       |
| `outputDir`   | String  | Directory for the compiled JavaScript output file.  | `"public/js"`   |
| `details`     | Boolean | Whether to display detailed logs during compilation.| `false`         |

---

## Output

The output is a single JavaScript file containing all compiled `.ejs` templates. By default, this file is saved as `public/js/views.js`.

The compiled file includes:
1. Precompiled views as functions.
2. A helper function `ejs.views_include` for including templates programmatically.

---


