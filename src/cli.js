#!/usr/bin/env node
// this is were I interact with the user
/* module.exports = () => {
  // ...
}; */

import { mdLinks } from "./index.js";
import process from 'process';
const pathToFile = process.argv[2];

const findFlags = (key) => {
  if (process.argv.includes(`--${ key }`)) return true;
  else return false;
}

let validate = findFlags('validate');
console.log('validate:', validate);
let stats = findFlags('stats');
console.log('stats', stats);

try {
  mdLinks(pathToFile, validate, stats)
    .then(extractedLinks => console.log(extractedLinks))
    // here parse the results from extractedLinks with a forEach
    .catch(error => console.log(`Error detected! ${error}`));
} catch (error) {
  console.log(`Caught by try/catch ${error}`);
}