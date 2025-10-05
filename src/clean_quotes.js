// This script processes quotes.json, adds an id, and removes non-ASCII quotes
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'quotes.json');
const outputPath = path.join(__dirname, 'quotes_cleaned.json');


// Allow standard English, numbers, punctuation, and common quote marks (curly quotes, dashes, ellipses)
function isMostlyAscii(str) {
  // Allow: a-zA-Z0-9, standard punctuation, whitespace, curly quotes, em/en dashes, ellipsis
  // Unicode: “ ” ‘ ’ — – …
  return /^[\x00-\x7F—–…]*$/.test(str);
}

const lines = fs.readFileSync(inputPath, 'utf-8').split(/\r?\n/);
const cleaned = [];
let id = 1;

for (const line of lines) {
  if (!line.trim()) continue;
  let obj;
  let processedLine;
  try {
    processedLine = line.replace(/“/g, "").replace(/”/g, "").replace(/‘/g, "").replace(/’/g, "");
    obj = JSON.parse(processedLine);
  } catch {
    continue;
  }
  if (isMostlyAscii(obj.quote) && isMostlyAscii(obj.author)) {
    cleaned.push({ id: id++, quote: obj.quote, author: obj.author });
  }
}
fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));
console.log('Done. Cleaned quotes written to', outputPath);
