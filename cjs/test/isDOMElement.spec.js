var _isDOMElement = require('../isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"isDOMElement"', () => {
  it('Should only return true for DOM elements', () => {
    // True statements
    expect((0, _isDOMElement2.default)(document.documentElement)).to.be.true;
    expect((0, _isDOMElement2.default)(document.body)).to.be.true;
    expect((0, _isDOMElement2.default)($.create('p'))).to.be.true;

    // False statements
    expect((0, _isDOMElement2.default)(document)).to.be.false;
    expect((0, _isDOMElement2.default)(document.createDocumentFragment())).to.be.false;
    expect((0, _isDOMElement2.default)(document.createTextNode(''))).to.be.false;
    expect((0, _isDOMElement2.default)(document.createComment(''))).to.be.false;
    expect((0, _isDOMElement2.default)(window)).to.be.false;
  });

  it('Should return true if DOM element matches one of the given html tag names', () => {
    expect((0, _isDOMElement2.default)(document.documentElement, 'html')).to.be.true;
    expect((0, _isDOMElement2.default)(document.documentElement, ['body', 'html'])).to.be.true;
    expect((0, _isDOMElement2.default)(document.documentElement, 'body, html')).to.be.true;
    expect((0, _isDOMElement2.default)(document.documentElement, 'body html')).to.be.true;
    expect((0, _isDOMElement2.default)(document.documentElement, 'body')).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect((0, _isDOMElement2.default)(null)).to.be.false;
    expect((0, _isDOMElement2.default)({})).to.be.false;
    expect((0, _isDOMElement2.default)({ nodeType: 1 })).to.be.false;
    expect((0, _isDOMElement2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */