#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
  pkg = require('./package.json'),
  formatString = require('./index'),
  theString = argv._,
  theObject = argv,
  config = argv;

delete argv._;

if (argv.help || argv.h) {
  console.log(formatString([
    '# :name',
    ':description',
    '',
    'Usage',
    '-----',
    '$ format-string "Hello, :name" --name stoeffel',
    '$ format-string "Hello, $name" --name stoeffel --prefix $'
  ].join('\n'), pkg));
} else {
  console.log(formatString(theString, theObject, config));
}
