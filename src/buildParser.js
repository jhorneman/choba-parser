"use strict";

// Get and verify command line parameters.
let opts = require("nomnom").parse();

let grammarPath = opts[0];
let outputPath = opts[1];

if (!grammarPath || !outputPath) {
    console.log("You must provide a path to the grammar and a path to the output file.");
    process.exit(1);
}

let fs = require('fs');
let path = require('path');

// Load grammar file.
grammarPath = path.normalize(grammarPath);
let grammar = fs.readFileSync(grammarPath, 'utf8');

console.log('Loaded grammar file...');

// Build parser.
let jison = require('jison');
let parser = new jison.Parser(grammar);
let parserSource = parser.generate({moduleMain: function() {}});

console.log('Built parser...');

outputPath = path.normalize(outputPath);
fs.writeFileSync(outputPath, parserSource, 'utf8');

console.log('Saved parser.');
