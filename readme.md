
# EJS Compiled Views

## Installation
Install the module using locally using `npm i ejsc-views` or globally using `npm i -g ejsc-views` to use the CLI. 



## Usage
`ejsc-views` Compiles all `<views_dir>/*.ejs` files into a single `<views_dir>/views.js` file.

```javascript
var ejsc = require('ejsc-views')
// compile all views/*.ejs files into a single /public/js/views.js file
ejsc.compile() 
``` 

The views directory and the output directory can be configured in `compile()`

```javascript
compile(views_dir = "views", output_dir = "public/js", details = false)
```

If you are using ES6 modules you can import the module using:

```javascript
import { compile } from 'ejsc-views'
```


To use globally you can install ejsc-views using the command: `npm i -g  ejsc-views`
The CLI options are:

```
Usage: ejsc [options]

Compile all views/*.ejs files into a single /public/js/views.js file

Options:
  -V, --version              output the version number
  -v, --views <views_dir>    views directory (default: "views")
  -o, --output <output_dir>  output directory (default: "public/js")
  -d, --details              display the compiled views
  -h, --help                 display help for command
```


