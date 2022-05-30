import path from 'path';
import fs from 'fs';

export const absolutify = (route) => path.isAbsolute(route) ? route : path.resolve(route);

export const pathExists = (route) => fs.existsSync(route);

export const isDirectory = (route) => fs.statSync(route).isDirectory();

export const isFile = (route) => fs.statSync(route).isFile();

export const isMd = (route) => path.extname(route) === '.md';

let mdArray = [];
export const saveMd = (md) => {
    mdArray.push(md);
    console.log('md array: ' + mdArray);
    return mdArray;
}

export const scanDir = (route) => {
    fs.readdirSync(route).forEach(el => {
        const filePath = path.join(route, el);
        console.log(filePath);
        if (isDirectory(filePath)) {
            scanDir(filePath);
        } else {
            saveMd(filePath);
        }
    });
    return mdArray;
}

const extractLinks = (array) => {
    // read file match map slice concat
}
