/**
 * mokuji-markdown
 * md.js
 * Ver. 1.0.4
 */

module.exports = class Markdown {

  constructor(text, isHideH1, isMuteMokuji) {
    this.text = text;
    this.isHideH1 = isHideH1;
    this.isMuteMokuji = isMuteMokuji;
  }

  getHeaders() {
    return this.text
        .replace(H1, '# $1\n')
        .replace(H2, '## $1\n')
        .replace(CODE, '')
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
        .filter((line) => isHeader(line))
        .map((line) => {
          if (this.isHideH1) {
            return line.replace(/## /g, '# ');
          }
          return line;
        });
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
      .map((line) => line.replace(/# /g, '#- '))
      .map((line) => line.replace(/#/, ''))
      .map((line) => line.replace(/#/g, '  '))
      .join('\n');
  }

  /** 完璧ではない **/
  getReformatLinkHeaders() {
    let alreadyLinks = [];
    return this
      .getHeaders()
      .map((line) => {
        line = line.replace(/# (.*)/g, '#- ');
        let match = RegExp.$1;
        let link = match.toLowerCase()
                        .replace(/\./g, "")
                        .replace(/\,/g, "")
                        .replace(/\(/g, "")
                        .replace(/\)/g, "")
                        .replace(/（/g, "")
                        .replace(/）/g, "")
                        .replace(/ /g, "-");
        if (alreadyLinks[link] !== undefined) {
          alreadyLinks[link] += 1;
          link += "-" + alreadyLinks[link];
        } else {
          alreadyLinks[link] = 0;
        }
        return line + "[" + match + "](%" + link + ")";
      })
      .map((line) => line.replace(/#/, ''))
      .map((line) => line.replace(/#/g, '  '))
      .map((line) => line.replace(/\(%/g, '\(#'))
      .join('\n');
  }
}

const H1 = /(.*)\n==*\n/g;
const H2 = /(.*)\n--*\n/g;
const CODE = /```([\s\S]*?)```/g;

const isHeader = (line) => {
  return line.match(/^#(#*) (.*)$/);
}
