mokuji-markdown
===============

## 目次

- [概要](#概要)
- [開発環境](#開発環境)
- [利用方法](#利用方法)
  - [Install](#install)
  - [Run](#run)
- [注意点](#注意点)


概要
--

見出しをチェックして目次を生成します.

## 開発環境

- Mac
- Node.js

## 利用方法

### Install

```
npm install -g tanjo/mokuji-markdown
```

### Run

```
mdmokuji ./README.md
```

## オプション

- '-l, --link'
  - Generate link mokuji.
- '-x, --header'
  - H1 is also target. (include 目次)
- '-t, --target [value]'
  - Replace mokuji by pattern.

## 注意点

```
# これが目次になってはいけない
## これもこれも
どうすれバインダー
```
