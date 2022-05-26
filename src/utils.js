import path from 'path';
import fs from 'fs';

export const absolutify = (route) => path.isAbsolute(route) ? route : path.resolve(route);

export const pathExists = (route) => fs.existsSync(route);

export const isDirectory = (route) => fs.statSync(route).isDirectory();

export const isFile = (route) => fs.statSync(route).isFile();

export const isMd = (route) => path.extname(route) === '.md';

export const scanDir = (dir) => {
    const directory = fs.readdirSync(dir);
    console.log('inside ' + dir);
    directory.forEach(el => {
        const filePath = path.join(dir, el);
        console.log(filePath);
        if (isDirectory(filePath)) scanDir(filePath);
        else if (isMd(filePath)) searchForLinks(filePath);
    })
}

export const searchForLinks = (route) => console.log('seaching for links...');