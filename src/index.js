import { absolutify, pathExists, isFile, isMd, isDirectory, scanDir, extractLinks, extractedLinks, validateMyLinks } from './utils.js'

export const mdLinks = (route, validate) => new Promise ((resolve, reject) => {
    const absoluteRoute = absolutify(route);
    if (!pathExists(absoluteRoute)) {
        throw new Error("Invalid: Path does not exist");
    }
    
    let rawLinks;
    if (isDirectory(absoluteRoute)) {
        rawLinks = scanDir(absoluteRoute);
    } else if (isFile(absoluteRoute) && isMd(absoluteRoute)) {
        rawLinks = extractLinks(absoluteRoute);
    } else if (isFile(absoluteRoute) && !isMd(absoluteRoute)) {
        throw new Error('Path is not an .md file');
    }

    switch (validate) {
        case false:
            resolve(rawLinks);
            break;
        case true:
            const validatedLinks = validateMyLinks(rawLinks)
            .then(validatedLinks => resolve(validatedLinks))
            .catch(err => console.log(err))
            break;
    }

    if (extractedLinks.length < 1) {
        throw new Error('No links were found');
    }
});
