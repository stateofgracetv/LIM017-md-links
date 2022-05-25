import { absolutify, pathExists, isFile, isMd } from './utils.js'

export function mdLinks (argument) {
    const absoluteRoute = absolutify(argument);
    console.log(absoluteRoute);
    console.log('exists: ' + pathExists(absoluteRoute));
    console.log('is file: ' + isFile(absoluteRoute));
    console.log('is md: ' + isMd(absoluteRoute));
    if (isMd(absoluteRoute)) {
        // extraer links
    } else {
        // return?
    }
}
