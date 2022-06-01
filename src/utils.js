import path from 'path';
import fs, { link } from 'fs';

export const absolutify = (route) => path.isAbsolute(route) ? route : path.resolve(route);

export const pathExists = (route) => fs.existsSync(route);

export const isDirectory = (route) => fs.statSync(route).isDirectory();

export const isFile = (route) => fs.statSync(route).isFile();

export const isMd = (route) => path.extname(route) === '.md';

let mdArray = [];
export const saveMd = (md) => {
    mdArray.push(md);
    return mdArray;
}

export const scanDir = (route) => {
    fs.readdirSync(route).forEach(el => {
        const filePath = path.join(route, el);
        if (isDirectory(filePath)) {
            scanDir(filePath);
        } else {
            saveMd(filePath);
        }
    });
    // console.log(mdArray);
    return mdArray;
}

export const extractLinks = (file) => {
    const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'});
    const masterExp = /\[([^\[]+)\]\(http?(.*)\)/gm;
    const linkExp = /http?([^\)]*)/gm;
    const textExp = /(?<=\[).*(?=\])/gm;
    const arrayOfLinks = data.match(masterExp);
    let result = [];
    if (!arrayOfLinks) {
        return;
    }
    else {
        arrayOfLinks.forEach(e => {
            const href = e.match(linkExp).toString();
            const text = e.match(textExp).toString();
            const myObject = {
                'file': file,
                'href': href,
                'text': text
            };
            result.push(myObject);
            console.log(file, href, text);
        })
        // console.log(result);
        return result;
    }
}
