var _prefixed = require('../prefixed');

var _prefixed2 = _interopRequireDefault(_prefixed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectArrayInput(arr, input) {
  expect(arr).to.be.a('array');
  expect(arr[0]).to.equal(`webkit${ input }`);
  expect(arr[1]).to.equal(`moz${ input }`);
  expect(arr[2]).to.equal(`ms${ input }`);
  expect(arr[3]).to.equal(`o${ input }`);
} /* eslint-env node, mocha, browser */
/* global expect */


describe('"prefixed"', () => {
  it('Should prefix a word with vendor prefixes', () => {
    expectArrayInput((0, _prefixed2.default)('prefixed'), 'Prefixed');
  });

  it('Should prefix a phrase with vendor prefixes and convert it into PascalCased word', () => {
    expectArrayInput((0, _prefixed2.default)('prefix this phrase'), 'PrefixThisPhrase');
  });

  it('Should always return array with prefixes', () => {
    expectArrayInput((0, _prefixed2.default)(9), '9');
    expectArrayInput((0, _prefixed2.default)(null), 'Null');
    expectArrayInput((0, _prefixed2.default)(), '');
  });
});