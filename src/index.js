import { absolutify, pathExists, isFile, isMd, isDirectory, scanDir, extractLinks, extractedLinks, validateMyLinks } from './utils.js'

export const mdLinks = (route, validate) => new Promise ((resolve, reject) => {
    const absoluteRoute = absolutify(route);
    if (!pathExists(absoluteRoute)) {
        throw new Error("Invalid: Path does not exist");
    }
    
    if (isDirectory(absoluteRoute)) {
        scanDir(absoluteRoute);
    } else if (isFile(absoluteRoute) && isMd(absoluteRoute)) {
        extractLinks(absoluteRoute);
    } else if (isFile(absoluteRoute) && !isMd(absoluteRoute)) {
        throw new Error('Path is not an .md file');
    }

    if (extractedLinks.length < 1) {
        throw new Error('No links were found');
    }

    switch (validate) {
        case false:
            resolve(extractedLinks);
            break;
        case true:
            const validatedLinks = validateMyLinks(extractedLinks)
            .then(validatedLinks => resolve(validatedLinks))
            .catch(err => console.log(err))
            break;
    }
});

export const reportStats = (route, validate) => new Promise ((resolve, reject) => {
    let statsObject = {};

    const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);

    const returnedLinks = mdLinks(route, validate)
    .then(returnedLinks => {
        const dupliiicates = findDuplicates(returnedLinks);
        statsObject.total = returnedLinks.length;
        statsObject.unique = statsObject.total - dupliiicates.length;
        if (validate) {
            let broken = 0;
            returnedLinks.forEach(linkObj => {
                if (linkObj.ok != 'OK') {
                    broken ++;
                }
            });
            statsObject.broken = broken;
        }
        resolve(statsObject);
    })
    .catch(error => console.log(`Error detected! ${error}`));
});
