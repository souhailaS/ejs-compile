// EJS Compiled Views - Generated on 2025-11-10T18:41:14.161Z
ejs.views_include = function(locals) {
  console.log("views_include_setup", locals);
  return function(path, d) {
    console.log("ejs.views_include", path, d);
    return ejs["views_" + path.replace(/\//g, "_").replace(/-/g, "_")](
      { ...d, ...locals },
      null,
      ejs.views_include(locals)
    );
  };
};
ejs.tic_tac_toe = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"game\">\n    <h1>Tic Tac Toe</h1>\n    <div class=\"board\">\n        <% for(let i = 0; i < 9; i++) { %>\n            <div class=\"cell\" data-index=\"<%= i %>\"></div>\n        <% } %>\n    </div>\n</div>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"game\">\n    <h1>Tic Tac Toe</h1>\n    <div class=\"board\">\n        ")
    ; __line = 4
    ;  for(let i = 0; i < 9; i++) { 
    ; __append("\n            <div class=\"cell\" data-index=\"")
    ; __line = 5
    ; __append(escapeFn( i ))
    ; __append("\"></div>\n        ")
    ; __line = 6
    ;  } 
    ; __append("\n    </div>\n</div>\n")
    ; __line = 9
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}
ejs.index = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<!DOCTYPE html>\n<html>\n<head>\n    <title><%= title %></title>\n</head>\n<body>\n    <h1><%= heading %></h1>\n    <p>Welcome to the test page!</p>\n</body>\n</html>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<!DOCTYPE html>\n<html>\n<head>\n    <title>")
    ; __line = 4
    ; __append(escapeFn( title ))
    ; __append("</title>\n</head>\n<body>\n    <h1>")
    ; __line = 7
    ; __append(escapeFn( heading ))
    ; __append("</h1>\n    <p>Welcome to the test page!</p>\n</body>\n</html>\n")
    ; __line = 11
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}
ejs.subfolder_nested = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"nested-component\">\n    <h2><%= title %></h2>\n    <p><%= content %></p>\n</div>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"nested-component\">\n    <h2>")
    ; __line = 2
    ; __append(escapeFn( title ))
    ; __append("</h2>\n    <p>")
    ; __line = 3
    ; __append(escapeFn( content ))
    ; __append("</p>\n</div>\n")
    ; __line = 5
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}