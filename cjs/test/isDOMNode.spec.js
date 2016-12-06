var _isDOMNode = require('../isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"isDOMNode"', () => {
  it('Should only return true for a HTML nodes', () => {
    // True statements
    expect((0, _isDOMNode2.default)(document.documentElement)).to.be.true;
    expect((0, _isDOMNode2.default)(document.body)).to.be.true;
    expect((0, _isDOMNode2.default)(document)).to.be.true;
    expect((0, _isDOMNode2.default)($.create('p'))).to.be.true;
    expect((0, _isDOMNode2.default)(document.createDocumentFragment())).to.be.true;
    expect((0, _isDOMNode2.default)(document.createTextNode(''))).to.be.true;
    expect((0, _isDOMNode2.default)(document.createComment(''))).to.be.true;

    // False statements
    expect((0, _isDOMNode2.default)(window)).to.be.false;
  });

  it('Should return false for non HTML nodes', () => {
    expect((0, _isDOMNode2.default)(null)).to.be.false;
    expect((0, _isDOMNode2.default)({})).to.be.false;
    expect((0, _isDOMNode2.default)({ nodeType: 1 })).to.be.false;
    expect((0, _isDOMNode2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */