#!/usr/bin/env node

import { mdLinks, reportStats } from "./index.js";
import chalk from 'chalk';
import process from 'process';
const commands = process.argv;

const pathToFile = commands[2];

const findFlags = (key) => {
  if (commands.includes(`--${ key }`)) return true;
  else return false;
}

let validate = findFlags('validate');
let stats = findFlags('stats');

function execute() {
  switch (stats) {
    case false:
      try {
        const result = mdLinks(pathToFile, validate)
        .then(result => {
          const numKeys = Object.keys(result[0]).length;
          switch (numKeys) {
            case 3: // no validate
              result.forEach(el => {
                console.log(chalk.bgGreen(pathToFile), chalk.underline(el.href), chalk.bold(el.text.slice(0, 50)));
              });
              break;
            case 5: // with validate
              result.forEach(el => {
                console.log(chalk.bgGreen(pathToFile), chalk.underline(el.href), chalk.blue.bold(el.ok), chalk.bold.green(el.status), chalk.bold(el.text.slice(0, 50)));
              });
          }
        })
        .catch(error => console.log(chalk.red.bold(`Error detected! ${error}`)));
      } catch (error) {
        console.log(`Caught by try/catch ${error}`);
      }
      break;

    case true:
      try {
        const resultStats = reportStats(pathToFile, validate)
        .then(resultStats => {
          console.log(chalk.white('Total:', resultStats.total));
          console.log(chalk.blue('Unique:', resultStats.unique));
          if (resultStats.broken) {
            console.log(chalk.red('Broken:', resultStats.broken));
          }
        })
        .catch(error => console.log(chalk.red.bold(`Error detected! ${error}`)));
      } catch (error) {
        console.log(`Caught by try/catch ${error}`);
      }
      break;
  }
}

execute();
