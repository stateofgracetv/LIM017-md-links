import { absolutify, pathExists, isFile, isMd, isDirectory, scanDir, saveMd, extractLinks, mdArray } from './utils.js'
import chalk from 'chalk';

export const mdLinks = (route, options) => new Promise ((resolve, reject) => {
    const absoluteRoute = absolutify(route);
    if (!pathExists(absoluteRoute)) {
        reject(console.log(chalk.bold.red("Invalid: Path does not exist")));
    }

    if (isDirectory(absoluteRoute)) {
        resolve(scanDir(absoluteRoute).map(extractLinks));
    } else if (isFile(absoluteRoute) && isMd(absoluteRoute)) {
        resolve(saveMd(absoluteRoute).map(extractLinks));
    }

    if (mdArray.length < 1) {
        reject(console.log(chalk.bold.red("No markdown files were found")));
    }
});
