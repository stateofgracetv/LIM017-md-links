import { absolutify, pathExists, isFile, isMd, isDirectory, scanDir, extractLinks, extractedLinks, validateMyLinks } from './utils.js'

export const mdLinks = (route, validate) => new Promise ((resolve, reject) => {
    const absoluteRoute = absolutify(route);
    if (!pathExists(absoluteRoute)) {
        throw new Error("Invalid: Path does not exist");
    }
    
    if (isDirectory(absoluteRoute)) {
        resolve(scanDir(absoluteRoute));
    } else if (isFile(absoluteRoute) && isMd(absoluteRoute)) {
        resolve(extractLinks(absoluteRoute));
    } else if (isFile(absoluteRoute) && !isMd(absoluteRoute)) {
        throw new Error('Path is not an .md file');
    }

    if (extractedLinks.length < 1) {
        throw new Error('No links were found');
    }

    if (validate) {
        const validatedLinks = validateMyLinks(extractedLinks)
        // resolve
        .then(validatedLinks => console.log(validatedLinks))
        .catch(err => console.log(err))
    }
});
