import absolutify from '../src/md-links.js'

describe('absolutify', () => {

  it('should be a function', () => {
    expect(typeof absolutify).toBe('function');
  });

  it('should convert a relative path to an absolute path', () => {
    expect(absolutify("README.md")).toBe("C:/Users/USUARIO/Documents/Code/LIM017-md-links/README.md");
  });

});
