var _matches = require('../matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"matches"', () => {
  before(() => $.html(`<div id="${ testID }"><span class="class"><b></b></span></div>`));
  after(() => $.remove(testID));

  it('Should indicate if a DOM element matches a given CSS selector', () => {
    const node = $.id(testID);

    // expect(matches(node, '#testID')).to.be.true;
    expect((0, _matches2.default)(node, '.class')).to.be.false;
    expect((0, _matches2.default)(node.firstChild, '#testID')).to.be.false;
    // expect(matches(node.firstChild, '.class')).to.be.true;
    expect((0, _matches2.default)(node.firstChild.firstChild, '#testID')).to.be.false;
    expect((0, _matches2.default)(node.firstChild.firstChild, '.class')).to.be.false;
    // expect(matches(document.body, 'body')).to.be.true;
    expect((0, _matches2.default)(document.body, 'html')).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect((0, _matches2.default)(null)).to.be.false;
    expect((0, _matches2.default)({})).to.be.false;
    expect((0, _matches2.default)()).to.be.false;
  });
});