import { absolutify, pathExists, isFile, isMd, isDirectory, scanDir, extractLinks, extractedLinks } from './utils.js'
import chalk from 'chalk';

export const mdLinks = (route, options) => new Promise ((resolve, reject) => {
    const absoluteRoute = absolutify(route);
    if (!pathExists(absoluteRoute)) {
        reject(console.log(chalk.bold.red("Invalid: Path does not exist")));
        return;
    }

    if (isDirectory(absoluteRoute)) {
        console.log(scanDir(absoluteRoute));
    } else if (isFile(absoluteRoute) && isMd(absoluteRoute)) {
        resolve(console.log(extractLinks(absoluteRoute)));
    } else if (isFile(absoluteRoute) && !isMd(absoluteRoute)) {
        reject(console.log('Path is not an .md file'));
        return;
    }

    if (extractedLinks.length < 1) {
        reject(console.log('No links were found'));
    }
});
