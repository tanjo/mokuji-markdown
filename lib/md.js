/**
 * mokuji-markdown
 * md.js
 * Ver. 1.0.1
 */

module.exports = class Markdown {

  constructor(text, isHideH1, isMuteMokuji) {
    this.text = text;
    this.isHideH1 = isHideH1;
    this.isMuteMokuji = isMuteMokuji;
  }

  getHeaders() {
    return this.text
        .replace(H1, '# $1')
        .replace(H2, '## $1')
        .split('\n')
        .filter((line) => {
          if (this.isHideH1) {
            return !line.match(/^# (.*)$/);
          }
          return true;
        })
        .filter((line) => {
          if (this.isMuteMokuji) {
            return !line.match(/# 目次/);
          }
          return true;
        })
        .filter((line) => isHeader(line));
  }

  getReformatHeaders(isLink) {
    if (isLink) {
      return this.getReformatLinkHeaders();
    } else {
      return this.getReformatNoLinkHeaders();
    }
  }

  getReformatNoLinkHeaders() {
    return this
      .getHeaders()
      .map((line) => line.replace(/# /g, '# - '))
      .map((line) => line.replace(/#/, ''))
      .map((line) => line.replace(/#/g, '  '))
      .join('\n');
  }

  /** 完璧ではない **/
  getReformatLinkHeaders() {
    return this
      .getHeaders()
      .map((line) => {
        line = line.replace(/# (.*)/g, '# - ');
        return line + "[" + RegExp.$1 + "](%" + RegExp.$1.toLowerCase().replace(/\./g, "").replace(/\,/g, "").replace(/ /g, "-") + ")"
      })
      .map((line) => line.replace(/#/, ''))
      .map((line) => line.replace(/#/g, '  '))
      .map((line) => line.replace(/\(%/g, '\(#'))
      .join('\n');
  }
}

const H1 = /(.*)\n==*\n/g;
const H2 = /(.*)\n--*\n/g;

const isHeader = (line) => {
  return line.match(/^#(#*) (.*)$/);
}
