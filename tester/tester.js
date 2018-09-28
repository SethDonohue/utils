const describe  = (description, fn) => {
  console.log('\x1b[1m%s\x1b[0m', description);
  fn();
}

const it = (message, fn) => describe ('    ' + message, fn);

const matchers = (expected) => ({
  toBe: (assertion) => {
    if(expected === assertion) {
      console.log('\x1b[30m\x1b[42m%s\x1b[0m', '    PASS.\n');
      return true;
    } else {
      console.error('\x1b[30m\x1b[41m%s\x1b[0m', '    FAIL.', 'Expected: ' + assertion);
      console.error('          Received: ' + expected + '\n');
      return false;
    }
  }
});

const expect = (value) => matchers(value);

module.exports = {
  describe,
  expect,
  it,
  matchers
};
