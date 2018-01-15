/**
 * mokuji-markdown
 * index.js
 * Ver. 1.0.0
 */

const fs = require('fs');
const MD = require('./lib/md');
const IO = require('./lib/io');

const main = (argv) => {
  IO.readme(argv, (data, error, path) => {
    if (error) {
      throw error;
    }
    if (argv[3]) {
      IO.replace(new MD(data, true, true).getReformatHeaders(), argv[3], path);
    } else {
      IO.setMokuji(new MD(data, true, true).getReformatHeaders(), path);
    }
  });
};

main(process.argv);
