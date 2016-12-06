var _inDOM = require('../inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"inDOM"', () => {
  it('Should return true for DOM elements actually in the DOM tree', () => {
    const hidden = $.create('p');
    hidden.style.cssText = 'width: 0; height: 0; position: absolute; margin: 0; padding: 0; opacity: 0; oveflow: hidden;';

    document.body.appendChild(hidden);

    // True statements
    expect((0, _inDOM2.default)(document.documentElement)).to.be.true;
    expect((0, _inDOM2.default)(document.body)).to.be.true;
    expect((0, _inDOM2.default)(hidden)).to.be.true;

    // False statements
    expect((0, _inDOM2.default)(document)).to.be.false;
    expect((0, _inDOM2.default)($.create('p'))).to.be.false;
    expect((0, _inDOM2.default)(document.implementation.createHTMLDocument('').documentElement)).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect((0, _inDOM2.default)(null)).to.be.false;
    expect((0, _inDOM2.default)({})).to.be.false;
    expect((0, _inDOM2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */