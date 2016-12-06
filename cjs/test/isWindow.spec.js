var _isWindow = require('../isWindow');

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"isWindow"', () => {
  it('Should return true for window elements', () => {
    expect((0, _isWindow2.default)(window)).to.be.true;

    const iframe = $.create('iframe');
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);

    expect((0, _isWindow2.default)(iframe)).to.be.false;
    expect((0, _isWindow2.default)(iframe.contentWindow)).to.be.true;

    document.body.removeChild(iframe);
  });

  it('Should return false for non window values', () => {
    expect((0, _isWindow2.default)(null)).to.be.false;
    expect((0, _isWindow2.default)({})).to.be.false;
    expect((0, _isWindow2.default)(document)).to.be.false;
    expect((0, _isWindow2.default)(document.body)).to.be.false;
    expect((0, _isWindow2.default)(document.documentElement)).to.be.false;
    expect((0, _isWindow2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */