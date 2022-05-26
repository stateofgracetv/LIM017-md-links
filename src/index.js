import { absolutify, pathExists, isFile, isMd, isDirectory, scanDir, searchForLinks } from './utils.js'

export function mdLinks (argument) {
    const absoluteRoute = absolutify(argument);
    console.log(absoluteRoute);
    console.log('exists: ' + pathExists(absoluteRoute));

    if (isDirectory(absoluteRoute)) {
        console.log('is dir: ' + isDirectory(absoluteRoute));
        scanDir(absoluteRoute);
    } else if (isFile(absoluteRoute) && isMd(absoluteRoute)) {
        console.log('is file: ' + isFile(absoluteRoute));
        console.log('is md: ' + isMd(absoluteRoute));
        searchForLinks();
    }
}
