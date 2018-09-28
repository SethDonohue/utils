const {
  describe,
  it,
  expect,
  matchers
} = require('./tester.js');

function add(a,b){
  return a + b;
};

let executes = 0;
const noop = () => { executes += 1};

describe('describe', () => {
  it('Executes a callback function and Passes', () => {
    const actual = describe('', noop);

    expect(executes).toBe(1);
  })
  it('Executes a callback function and Fails', () => {
    executes = 0;
    const actual = describe('', noop);

    expect(executes).toBe(0);
  })
})

describe('expect', () => {
  it('should return and object', () => {
    const actual = expect(true);
    expect(typeof actual).toBe('object');
  })
  it('previous object\'s .toBe should be a function', () => {
    const actual = expect(true);
    expect(typeof actual.toBe).toBe('function');
  })
})

describe('matchers', () => {
  describe('toBe', () => {
    it('Primitives are equal', () => {
      const actual = matchers('1').toBe('1');
      expect(actual).toBe(true);
    })
    it('Primitives are NOT equal', () => {
      const actual = matchers(1).toBe(2);
      console.log('Fail log will show above, but true test result is directly below:');
      expect(actual).toBe(false);
    })

  })
})

describe('add', () => {
  it('Adds two numbers together correctly', () => {
    expect(add(1,4)).toBe(5);
  })
})
