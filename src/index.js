#!/usr/bin/env node
/* module.exports = () => {
  // ...
}; */

// import { path, sep } from 'path';
const path = require('path');
const fs = require('fs');
const { argv } = require('node:process');
const pathToFile = argv[2];

function absolutify(route) {
  let absolute = '';
  path.isAbsolute(route) ? absolute = route : absolute = path.resolve(route);
  return absolute;
}

console.log(absolutify(pathToFile));
