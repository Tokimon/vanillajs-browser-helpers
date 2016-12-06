var _invisible = require('../invisible');

var _invisible2 = _interopRequireDefault(_invisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"invisible"', () => {
  before(() => $.html(`
  <style id="Style">
  #${ testID } { display: none; }
  #NotVisible { visibility: hidden; }
  #Collapsed { height: 0; overflow: hidden; }
  #Transparent { opacity: 0; }
  div { height: 10px; }
  </style>
  <div id="${ testID }"><div id="ChildDisplay"></div></div>
  <div id="NotVisible"><div id="ChildVisibility"></div></div>
  <div id="Collapsed"><div id="ChildCollapsed"></div></div>
  <div id="Transparent"><div id="ChildTransparent"></div></div>
  <div id="Visible"></div>
  `));

  after(() => {
    [testID, 'Style', 'NotVisible', 'Visible', 'Collapsed', 'Transparent'].forEach(id => {
      $.remove(id);
    });
  });

  it('Should return true if DOM element is "display: none"', () => {
    const node = $.id(testID);
    expect((0, _invisible2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "display: none"', () => {
    const node = $.id('ChildDisplay');
    expect((0, _invisible2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is "visibility: hidden"', () => {
    const node = $.id('NotVisible');
    expect((0, _invisible2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = $.id('ChildVisibility');
    expect((0, _invisible2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is Collapsed', () => {
    const node = $.id('Collapsed');
    expect((0, _invisible2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is Collapsed', () => {
    const node = $.id('Collapsed');
    expect((0, _invisible2.default)(node.firstChild)).to.be.true;
  });

  it('Should return true if DOM element is Transparent', () => {
    const node = $.id('Transparent');
    expect((0, _invisible2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is Transparent', () => {
    const node = $.id('Transparent');
    expect((0, _invisible2.default)(node.firstChild)).to.be.true;
  });

  it('Should return true if DOM element is not in the DOM', () => {
    const node = $.create('div');
    expect((0, _invisible2.default)(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is not in the DOM', () => {
    const node = $.create('div');
    node.innerHTML = '<p></p>';
    expect((0, _invisible2.default)(node.firstChild)).to.be.true;
  });

  it('Should return false if DOM element is in the DOM and is not styled invisible', () => {
    const node = $.id('Visible');
    expect((0, _invisible2.default)(node)).to.be.false;
  });

  it('Should return true for non DOM elements', () => {
    expect((0, _invisible2.default)(null)).to.be.true;
  });
});