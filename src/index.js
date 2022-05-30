import { absolutify, pathExists, isFile, isMd, isDirectory, scanDir, /* searchForLinks, */  saveMd } from './utils.js'

export function mdLinks (argument) {
    const absoluteRoute = absolutify(argument);
    console.log(absoluteRoute);
    console.log('exists: ' + pathExists(absoluteRoute));

    if (isDirectory(absoluteRoute)) {
        console.log('is dir: ' + isDirectory(absoluteRoute));
        scanDir(absoluteRoute);
    } else if (isFile(absoluteRoute) && isMd(absoluteRoute)) {
        saveMd(absoluteRoute);
        // extractLinks(absoluteRoute);
    }
    // const arrayOfLinks = mdArray.map(extractLinks)
}
