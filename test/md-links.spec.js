import { absolutify, pathExists, isDirectory, isFile, isMd } from '../src/utils.js'

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

describe('searchForLinks', () => {

  it('should ', () => {
    expect(searchForLinks('')).toBe();
  })

})