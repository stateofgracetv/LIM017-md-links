import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

export const absolutify = (route) => path.isAbsolute(route) ? route : path.resolve(route);

export const pathExists = (route) => fs.existsSync(route);

export const isDirectory = (route) => fs.statSync(route).isDirectory();

export const isFile = (route) => fs.statSync(route).isFile();

export const isMd = (route) => path.extname(route) === '.md';

export const scanDir = (route) => {
    const dirList = fs.readdirSync(route);
    if (dirList.length < 1) {
        return null;
    }
    let links;
    dirList.forEach(el => {
        const filePath = path.join(route, el);
        if (isDirectory(filePath)) {
            scanDir(filePath);
        } else if (isMd(filePath)) {
            links = extractLinks(filePath);
        }
    });
    return links;
}

export let extractedLinks = [];
export const extractLinks = (file) => {
    const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'});
    const masterExp = /\[([^\[]+)\]\(http?(.*)\)/gm;
    const linkExp = /http?([^\)]*)/gm;
    const textExp = /(?<=\[).*(?=\])/gm;
    const arrayOfLinks = data.match(masterExp);
    if (!arrayOfLinks) {
        return null;
    }
    else {
        arrayOfLinks.forEach(e => {
            const href = e.match(linkExp).toString();
            const text = e.match(textExp).toString();
            const linkObject = {
                'file': file,
                'href': href,
                'text': text
            };
            extractedLinks.push(linkObject);
        });
        return extractedLinks;
    }
}

export const validateMyLinks = (arrLinks) => {
    const arrPromises = arrLinks.map((obj) => fetch(obj.href)
        .then(Response => {
            const validatedObject = {
                'file': obj.file,
                'href': obj.href,
                'ok': Response.statusText,
                'status': Response.status,
                'text': obj.text
            };
            return validatedObject;
        })
        .catch(err => console.log(err))
    )
    return Promise.all(arrPromises);
}
