var _isDOMChildNode = require('../isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"isDOMChildNode"', () => {
  before(() => $.html(`<div id="${ testID }">
  <span></span>
</div>`));

  after(() => $.remove(testID));

  it('Should return true for DOM nodes in the DOM below the DOM root element', () => {
    expect((0, _isDOMChildNode2.default)(document.body)).to.be.true;
    expect((0, _isDOMChildNode2.default)(document.documentElement)).to.be.false;
    expect((0, _isDOMChildNode2.default)($.id(testID).firstChild)).to.be.true;
  });

  it('Should return true for child DOM nodes of a DOM element not in the DOM', () => {
    const div = $.create('div');
    div.innerHTML = '<b></b>\ntext';
    expect((0, _isDOMChildNode2.default)(div)).to.be.false;
    expect((0, _isDOMChildNode2.default)(div.firstChild)).to.be.true;
    expect((0, _isDOMChildNode2.default)(div.firstChild.nextSibling)).to.be.true;
  });

  it('Should return false for non DOM elements', () => {
    expect((0, _isDOMChildNode2.default)(null)).to.be.false;
    expect((0, _isDOMChildNode2.default)({})).to.be.false;
    expect((0, _isDOMChildNode2.default)({ parentNode: { nodeType: 1 } })).to.be.false;
    expect((0, _isDOMChildNode2.default)()).to.be.false;
  });
});