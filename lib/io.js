/**
 * mokuji-markdown
 * io.js
 * Ver. 1.0.0
 */

const fs = require('fs');
const path = require('path');

module.exports = class IO {
  static replace(mokuji, target, filePath) {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        throw error;
      }
      const readme = data.replace(target, mokuji);
      fs.writeFile(filePath, readme, (error) => {
        if (error) {
          throw error;
        }
      });
    });
  }

  static setMokuji(mokuji, filePath) {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        throw error;
      }
      const readme = data.replace(/# 目次\n([\s\S]*?)(?=#)|# 目次\n([\s\S]*)/, "# 目次\n\n" + mokuji + "\n\n");
      fs.writeFile(filePath, readme, (error) => {
        if (error) {
          throw error;
        }
      });
    });
  }

  /// callback(data, error, path);
  static readme(argv, callback) {
    const argc = argv.length;
    let target;
    if (argc < 3) {
      target = process.cwd() + "/README.md";
    } else {
      target = path.resolve(argv[2]);
    }
    if (!fs.existsSync(target)) {
      callback(null, "wrong path.    \n" + target);
      return;
    }
    let readme = null;
    if (fs.statSync(target).isDirectory()) {
      const readmePath = target + "/README.md";
      if (!fs.existsSync(readmePath)) {
        callback(null, "not found README.md.    \n" + readmePath);
        return;
      }
      readme = readmePath;
    } else {
      readme = target;
    }
    if (!readme) {
      callback(null, "not found file path.");
      return;
    }
    fs.readFile(readme, 'utf8', (error, data) => {
      if (error) {
        callback(null, error);
        return;
      }
      callback(data, null, readme);
    });
  };
};
