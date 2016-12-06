var _remove = require('../remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"remove"', () => {
  before(() => $.html(`<div id="${ testID }"><div id="child"></div></div>`));
  after(() => $.remove(testID));

  it('Should always return the removed element', () => {
    expect((0, _remove2.default)(null)).to.be.null;
    expect((0, _remove2.default)(document)).to.equal(document);
    expect((0, _remove2.default)(window)).to.equal(window);

    const child = $.id('child');
    expect((0, _remove2.default)(child)).to.equal(child);
  });

  it('Should ignore non DOM child elements', () => {
    expect((0, _remove2.default)(null)).to.not.fail;
    expect((0, _remove2.default)(document)).to.not.fail;
    expect((0, _remove2.default)(document.documentElement)).to.not.fail;
    expect((0, _remove2.default)(window)).to.not.fail;
  });

  it('Should remove a given DOM element', () => {
    const tester = $.id(testID);
    (0, _remove2.default)(tester);
    expect(tester.parentNode).to.be.null;
    expect($.id(testID)).to.be.null;
  });
});