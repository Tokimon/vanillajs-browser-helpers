var _prepend = require('../prepend');

var _prepend2 = _interopRequireDefault(_prepend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'AppendTest'; /* eslint-env node, mocha, browser */
/* global expect, $ */

const insertHTML = '<div class="inserted"></div>';

describe('"prepend"', () => {
  before(() => $.html(`<div id="${ testID }"></div>`));
  beforeEach(() => {
    $.id(testID).innerHTML = `<span></span>`;
  });

  after(() => $.remove(testID));

  it('Should prepend plain HTML to a DOM element', () => {
    const node = $.id(testID);

    expect(node.firstChild).not.to.have.attribute('class', 'inserted');
    (0, _prepend2.default)(node, insertHTML);
    expect(node.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should prepend DOM element to a DOM element', () => {
    const node = $.id(testID);
    const div = $.create('div');
    div.className = 'inserted';

    expect(node.firstChild).not.to.have.attribute('class', 'inserted');
    (0, _prepend2.default)(node, div);
    expect(node.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should prepend to DOM elements not inserted into the DOM', () => {
    const div = $.create('div');

    (0, _prepend2.default)(div, insertHTML);

    expect(div.firstChild).not.to.be.null;
    expect(div.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should move element from one DOM element to another', () => {
    const node = $.id(testID);
    node.innerHTML = `<div id="Moved"></div><div id="NewContainer"></div>`;

    const moveDiv = $.id('Moved');
    const newCont = $.id('NewContainer');

    expect(node.firstChild).to.have.id('Moved');
    expect(newCont.firstChild).to.be.null;

    (0, _prepend2.default)(newCont, moveDiv);

    expect(node.firstChild).to.have.id('NewContainer');
    expect(newCont.firstChild).not.to.be.null;
    expect(newCont.firstChild).to.have.id('Moved');
  });

  it('Should always return the inserted DOM element', () => {
    const node = $.id(testID);

    const div = $.create('div');
    div.className = 'inserted-always-dom';

    expect((0, _prepend2.default)(node, div)).to.have.class('inserted-always-dom');
    expect((0, _prepend2.default)(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should return null when ister fails DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect((0, _prepend2.default)(document.parentNode, insertHTML)).to.be.null;
    expect((0, _prepend2.default)(null, insertHTML)).to.be.null;
    expect((0, _prepend2.default)({}, insertHTML)).to.be.null;
  });
});