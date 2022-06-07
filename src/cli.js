#!/usr/bin/env node
// this is were I interact with the user
/* module.exports = () => {
  // ...
}; */

import { mdLinks } from "./index.js";
import chalk from 'chalk';
const pathToFile = process.argv[2] ;

try {
  mdLinks(pathToFile)
    .then(function prettyPrint(extractedLinks) {
      extractedLinks.forEach(el => {
        console.log(chalk.bgGreen(pathToFile), chalk.underline(el.href), chalk.bold(el.text.slice(0, 50)));
      });
    })
    .catch(error => console.log(`Error detected! ${error}`));
} catch (error) {
  console.log(`Caught by try/catch ${error}`);
}