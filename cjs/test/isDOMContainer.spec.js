var _isDOMContainer = require('../isDOMContainer');

var _isDOMContainer2 = _interopRequireDefault(_isDOMContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"isDOMContainer"', () => {
  it('Should only return true for DOM element or Document Fragment', () => {
    // True statements
    expect((0, _isDOMContainer2.default)(document.documentElement)).to.be.true;
    expect((0, _isDOMContainer2.default)(document.body)).to.be.true;
    expect((0, _isDOMContainer2.default)($.create('p'))).to.be.true;
    expect((0, _isDOMContainer2.default)(document.createDocumentFragment())).to.be.true;

    // False statements
    expect((0, _isDOMContainer2.default)(document)).to.be.false;
    expect((0, _isDOMContainer2.default)(document.createComment(''))).to.be.false;
    expect((0, _isDOMContainer2.default)(document.createTextNode(''))).to.be.false;
    expect((0, _isDOMContainer2.default)(window)).to.be.false;
  });

  it('Should return false for non DOM nodes', () => {
    expect((0, _isDOMContainer2.default)(null)).to.be.false;
    expect((0, _isDOMContainer2.default)({})).to.be.false;
    expect((0, _isDOMContainer2.default)({ nodeType: 1, parentNode: { nodeType: 1 } })).to.be.false;
    expect((0, _isDOMContainer2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */