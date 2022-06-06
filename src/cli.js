#!/usr/bin/env node
// this is were I interact with the user
/* module.exports = () => {
  // ...
}; */

import { mdLinks } from "./index.js";
const pathToFile = process.argv[2] ;

try {
  mdLinks(pathToFile)
    .then(extractedLinks => console.log(extractedLinks))
    .catch(error => console.log(`Error detected! ${error}`));
} catch (error) {
  console.log(`Caught by try/catch ${error}`);
}