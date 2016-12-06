var _isDOMFragment = require('../isDOMFragment');

var _isDOMFragment2 = _interopRequireDefault(_isDOMFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"isDOMFragment"', () => {
  it('Should only return true for a Document fragment', () => {
    // True statements
    expect((0, _isDOMFragment2.default)(document.createDocumentFragment())).to.be.true;
  });

  it('Should return false for non Document fragments', () => {
    expect((0, _isDOMFragment2.default)(document.documentElement)).to.be.false;
    expect((0, _isDOMFragment2.default)(document.body)).to.be.false;
    expect((0, _isDOMFragment2.default)(document)).to.be.false;
    expect((0, _isDOMFragment2.default)($.create('p'))).to.be.false;
    expect((0, _isDOMFragment2.default)(document.createTextNode(''))).to.be.false;
    expect((0, _isDOMFragment2.default)(document.createComment(''))).to.be.false;
    expect((0, _isDOMFragment2.default)(window)).to.be.false;
    expect((0, _isDOMFragment2.default)(null)).to.be.false;
    expect((0, _isDOMFragment2.default)({})).to.be.false;
    expect((0, _isDOMFragment2.default)({ nodeType: 1 })).to.be.false;
    expect((0, _isDOMFragment2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */