#!/usr/bin/env node
const { program } = require('commander');
var compress = require('../lib/compress');
var pkg = require('../package.json');
var path = require("path");
var fs = require("fs-extra");
function saveFile(filePath, content) {
  fs.createFileSync(filePath);
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log(filePath);
}
program
  .version(pkg.version)
  .option('-compress, --isCompress [value]', 'open compress (default: true)', true)
  .option("-o, --output [path]", "the output file dirname")
  .parse(process.argv);
var config = {
  compress: true
};