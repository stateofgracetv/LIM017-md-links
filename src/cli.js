#!/usr/bin/env node
// this is were I interact with the user
/* module.exports = () => {
  // ...
}; */

import { mdLinks } from "./index.js";
import chalk from 'chalk';
import process from 'process';
const commands = process.argv;

const pathToFile = commands[2];

const findFlags = (key) => {
  if (commands.includes(`--${ key }`)) return true;
  else return false;
}

let validate = findFlags('validate');
console.log('validate:', validate);
let stats = findFlags('stats');
console.log('stats:', stats);

// execute
/* switch (commands.lenght) {
  case 2:
    console.log('Welcome to this md-links library, enter --help to know how it works')
} */

try {
  // mdLinks(pathToFile, validate)
  const result = mdLinks(pathToFile, validate)
  .then(result => console.log(result))
  /* .then(function prettyPrint(extractedLinks) {
    extractedLinks.forEach(el => {
      console.log(chalk.bgGreen(pathToFile), chalk.underline(el.href), chalk.bold(el.text.slice(0, 50)));
    });
  }) */
  .catch(error => console.log(`Error detected! ${error}`));
} catch (error) {
  console.log(`Caught by try/catch ${error}`);
}