#!/usr/bin/env node

/**
 * mokuji-markdown
 * index.js
 * Ver. 1.0.2
 */

const fs = require('fs');
const commander = require('commander');

const MD = require('./lib/md');
const IO = require('./lib/io');

const main = (argv) => {
  commander
      .version("1.0.2")
      .option('-l, --link', 'Generate link mokuji.')
      .option('-t, --target [value]', 'Replace mokuji by pattern.')
      .parse(argv);

  IO.readme(commander.args, (data, error, path) => {
    if (error) {
      throw error;
    }
    if (commander.target) {
      IO.replace(new MD(data, true, true).getReformatHeaders(commander.link), commander.target, path);
    } else {
      IO.setMokuji(new MD(data, true, true).getReformatHeaders(commander.link), path);
    }
  });
};

main(process.argv);
