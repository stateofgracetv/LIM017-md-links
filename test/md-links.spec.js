import { absolutify } from '../src/md-links.js'

describe('absolutify', () => {

  it('should be a function', () => {
    expect(typeof absolutify).toBe('function');
  });

  it('should convert a relative path to an absolute path', () => {
    expect(absolutify("README.md")).toBe("C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\README.md");
  });

  it('should return the input is the path is already absolute', () => {
    expect(absolutify("C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\README.md")).toBe("C:\\Users\\USUARIO\\Documents\\Code\\LIM017-md-links\\README.md");
  });

});
