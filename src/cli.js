#!/usr/bin/env node
// this is were I interact with the user
/* module.exports = () => {
  // ...
}; */

// import { path, sep } from 'path';
// const { argv } = require('node:process');
// const pathToFile = argv[2];

import { mdLinks } from "./index.js";
const pathToFile = process.argv[2] ;
mdLinks(pathToFile);
