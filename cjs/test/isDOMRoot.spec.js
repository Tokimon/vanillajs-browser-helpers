var _isDOMRoot = require('../isDOMRoot');

var _isDOMRoot2 = _interopRequireDefault(_isDOMRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"isDOMRoot"', () => {
  it('Should only return true for the DOM element', () => {
    // True statements
    expect((0, _isDOMRoot2.default)(document.documentElement)).to.be.true;

    // False statements
    expect((0, _isDOMRoot2.default)(document.body)).to.be.false;
    expect((0, _isDOMRoot2.default)(document)).to.be.false;
    expect((0, _isDOMRoot2.default)($.create('html'))).to.be.false;
    expect((0, _isDOMRoot2.default)(document.implementation.createHTMLDocument('').documentElement)).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect((0, _isDOMRoot2.default)(null)).to.be.false;
    expect((0, _isDOMRoot2.default)({})).to.be.false;
    expect((0, _isDOMRoot2.default)({ parentNode: { nodeType: 9 } })).to.be.false;
    expect((0, _isDOMRoot2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */