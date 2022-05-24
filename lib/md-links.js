import path from 'path';
import fs from 'fs';
export function absolutify(route) {
  let absolute = '';
  path.isAbsolute(route) ? absolute = route : absolute = path.resolve(route);
  return absolute;
}