import { absolutify, pathExists, isDirectory, isFile, isMd, scanDir, extractLinks } from '../src/utils.js'
jest.mock('node-fetch', () => jest.fn());

describe('absolutify', () => {

  it('should convert a relative path to an absolute path', () => {
    expect(absolutify("README.md")).toBe("C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\README.md");
  });
  it('should return the input is the path is already absolute', () => {
    expect(absolutify("C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\README.md")).toBe("C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\README.md");
  });

});

describe('pathExists', () => {

  it('should return true for an existing folder', () => {
    expect(pathExists('src')).toBe(true);
  });
  it('should return true for an existing file', () => {
    expect(pathExists('example.md')).toBe(true);
  });
  it('should return false for an inexistent file', () => {
    expect(pathExists('inexistente.jpg')).toBe(false);
  });

});

describe('isDirectory', () => {

  it('should return true for a directory', () => {
    expect(isDirectory('my-examples')).toBe(true);
  });
  it('should return false for a file', () => {
    expect(isDirectory('example.md')).toBe(false);
  });

});

describe('isFile', () => {

  it('should return true for a file', () => {
    expect(isFile('example.md')).toBe(true);
  });
  it('should return false for a directory', () => {
    expect(isFile('my-examples')).toBe(false);
  });
  
});

describe('isMd', () => {

  it('should return true for a markdown file', () => {
    expect(isMd('example.md')).toBe(true);
  });
  it('should return false for a .txt file', () => {
    expect(isMd('txt-example.txt')).toBe(false);
  });
  
});

describe('extractLinks', () => {

  const linkArray = [
    {
      file: 'C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\example.md',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
      text: 'Generalidades del protocolo HTTP - MDN'
    },
    {
      file: 'C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\example.md',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
      text: 'Mensajes HTTP - MDN'
    }
  ]
  it('should return an array of objects describing each a link', () => {
    expect(extractLinks('C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\example.md')).toEqual(expect.arrayContaining(linkArray));
  })

})

describe('scanDir', () => {

  const expectedArray = [
    {
      file: 'C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\my-examples\\example-dir\\example-4.md',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
      text: 'Mensajes HTTP - MDN'
    },
    {
      file: 'C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\my-examples\\example-dir\\example-4.md',
      href: 'http://invalid.com/nonexistent',
      text: 'This link does not work'
    },
    {
      file: 'C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\my-examples\\example2.md',
      href: 'https://open.spotify.com/playlist/0Y6tCCoBS71sJSVLtlYgkY',
      text: 'Taylor Swift for newbies'
    }
  ]
  it('should return all links present in the directory', () => {
    expect(scanDir('C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\my-examples')).toEqual(expect.arrayContaining(expectedArray));
  })

})