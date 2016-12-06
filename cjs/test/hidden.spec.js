var _hidden = require('../hidden');

var _hidden2 = _interopRequireDefault(_hidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"hidden"', () => {
  before(() => $.html(`
  <style id="Style">
  #${ testID } { display: none; }
  #NotVisible { visibility: hidden; }
  div { height: 10px; }
  </style>
  <div id="${ testID }"><div id="ChildDisplay"></div></div>
  <div id="NotVisible"><div id="ChildVisibility"></div></div>
  <div id="Visible"></div>
  `));

  after(() => {
    [testID, 'Style', 'NotVisible', 'Visible'].forEach(id => {
      $.remove(id);
    });
  });

  it('Should return true if DOM element is "display: none"', () => {
    const node = $.id(testID);
    expect((0, _hidden2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "display: none"', () => {
    const node = $.id('ChildDisplay');
    expect((0, _hidden2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is "visibility: hidden"', () => {
    const node = $.id('NotVisible');
    expect((0, _hidden2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = $.id('ChildVisibility');
    expect((0, _hidden2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is not in the DOM', () => {
    const node = $.create('div');
    expect((0, _hidden2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is not in the DOM', () => {
    const node = $.create('div');
    node.innerHTML = '<p></p>';
    expect((0, _hidden2.default)(node.firstChild)).to.be.true;
  });

  it('Should return false if DOM element is in the DOM and is not styled hidden', () => {
    const node = $.id('Visible');
    expect((0, _hidden2.default)(node)).to.be.false;
  });

  it('Should return true for non DOM elements', () => {
    expect((0, _hidden2.default)(null)).to.be.true;
  });
});