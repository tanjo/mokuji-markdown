#!/usr/bin/env node

/**
 * mokuji-markdown
 * index.js
 * Ver. 1.0.5
 */

const fs = require('fs');
const commander = require('commander');

const MD = require('./lib/md');
const IO = require('./lib/io');

const main = (argv) => {
  commander
      .version("1.0.5")
      .option('-l, --link', 'Generate link mokuji.')
      .option('-v, --header', 'H1 is also target. (include 目次)')
      .option('-t, --target [value]', 'Replace mokuji by pattern.')
      .parse(argv);

  IO.readme(commander.args, (data, error, path) => {
    if (error) {
      throw error;
    }
    const isH1 = !commander.header
    if (commander.target) {
      IO.replace(new MD(data, isH1, true).getReformatHeaders(commander.link), commander.target, path);
    } else {
      IO.setMokuji(new MD(data, isH1, true).getReformatHeaders(commander.link), path);
    }
  });
};

main(process.argv);
