var _viewport = require('../viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"viewport"', () => {
  const { body, documentElement: html } = document;
  const bodyOrHtml = elm => elm === body || elm === html;

  it('Should return NULL if no document was found', () => {
    const fakeDocCompat = { nodeType: 9, compatMode: 'BackCompat', body };
    const fakeDoc = { nodeType: 9, documentElement: html };

    expect((0, _viewport2.default)({})).to.be.null;
    expect((0, _viewport2.default)(fakeDoc)).to.be.null;
    expect((0, _viewport2.default)(fakeDocCompat)).to.be.null;
  });

  it('Should return either the Body or DOM element', () => {
    expect((0, _viewport2.default)(document.createElement('div'))).to.satisfy(bodyOrHtml);
    expect((0, _viewport2.default)(document.createComment('Comment'))).to.satisfy(bodyOrHtml);
    expect((0, _viewport2.default)(document.body)).to.satisfy(bodyOrHtml);
    expect((0, _viewport2.default)(document.documentElement)).to.satisfy(bodyOrHtml);
    expect((0, _viewport2.default)(window)).to.satisfy(bodyOrHtml);
    expect((0, _viewport2.default)(document)).to.satisfy(bodyOrHtml);
    expect((0, _viewport2.default)(null)).to.satisfy(bodyOrHtml);
    expect((0, _viewport2.default)()).to.satisfy(bodyOrHtml);
  });
}); /* eslint-env node, mocha, browser */
/* global expect */