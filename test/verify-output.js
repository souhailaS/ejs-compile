#!/usr/bin/env node


import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputFile = join(__dirname, 'output', 'views.js');

console.log('\n--- Verifying compiled output ---');

if (!fs.existsSync(outputFile)) {
  console.error('ERROR: Output file does not exist at:', outputFile);
  process.exit(1);
}

const content = fs.readFileSync(outputFile, 'utf8');

const expectedFunctions = [
  'ejs.index',
  'ejs.subfolder_nested',
  'ejs.tic_tac_toe'
];

const forbiddenPatterns = [
  /ejs\.[A-Za-z]:\\/, // Windows absolute paths like C:\
  /ejs\.\/[Uu]sers\//, // Unix absolute paths like /Users/
  /ejs\.\/home\//, // Unix absolute paths like /home/
  /Desktop/i,
  /Documents/i
];

let hasErrors = false;

console.log('\nChecking for expected function names:');
for (const expectedFunc of expectedFunctions) {
  if (content.includes(expectedFunc)) {
    console.log(`[OK] Found: ${expectedFunc}`);
  } else {
    console.error(`x Missing: ${expectedFunc}`);
    hasErrors = true;
  }
}

console.log('\nChecking for forbidden absolute path patterns:');
for (const pattern of forbiddenPatterns) {
  if (pattern.test(content)) {
    console.error(`x Found forbidden pattern: ${pattern}`);
    console.error('  This indicates absolute paths are being used in function names');
    hasErrors = true;
  } else {
    console.log(`[OK] No match for: ${pattern}`);
  }
}

// Additional check: ensure no excessively long function names
console.log('\nChecking function name lengths:');
const functionMatches = content.match(/ejs\.\w+\s*=/g);
if (functionMatches) {
  for (const match of functionMatches) {
    const funcName = match.replace(/ejs\.|=/g, '').trim();
    if (funcName.length > 100) {
      console.error(`x Function name too long (${funcName.length} chars): ${funcName.substring(0, 50)}...`);
      console.error('  This likely indicates an absolute path is being used');
      hasErrors = true;
    }
  }
  console.log(`[OK] All function names are reasonable length`);
}

if (hasErrors) {
  console.error('\nx VERIFICATION FAILED: Issues detected in compiled output');
  process.exit(1);
} else {
  console.log('\n[OK] VERIFICATION PASSED: All checks passed successfully');
  process.exit(0);
}
