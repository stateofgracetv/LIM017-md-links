#!/usr/bin/env node
/* module.exports = () => {
  // ...
}; */

// import { path, sep } from 'path';
const path = require('path');
const fs = require('fs');
const { isAbsolute } = require('path');

console.log(`El separador en mi Sistema Operativo es: ${path.sep}`);

function absolutify(route) {
  let absolute = 'hola mundo';
  path.isAbsolute(route) ? absolute = route : absolute = path.resolve(route);
  return absolute;
}

console.log(absolutify('index.js'));
