var _isDOMDocument = require('../isDOMDocument');

var _isDOMDocument2 = _interopRequireDefault(_isDOMDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"isDOMDocument"', () => {
  it('Should only return true for Document node elements', () => {
    expect((0, _isDOMDocument2.default)(document)).to.be.true;

    const iframe = $.create('iframe');
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);

    expect((0, _isDOMDocument2.default)(iframe.contentDocument)).to.be.true;

    document.body.removeChild(iframe);
  });

  it('Should return false for non Document node elements', () => {
    expect((0, _isDOMDocument2.default)(window)).to.be.false;
    expect((0, _isDOMDocument2.default)(document.documentElement)).to.be.false;
    expect((0, _isDOMDocument2.default)(document.body)).to.be.false;
    expect((0, _isDOMDocument2.default)(null)).to.be.false;
    expect((0, _isDOMDocument2.default)({})).to.be.false;
    expect((0, _isDOMDocument2.default)({ nodeType: 9 })).to.be.false;
    expect((0, _isDOMDocument2.default)()).to.be.false;
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */