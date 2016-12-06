var _append = require('../append');

var _append2 = _interopRequireDefault(_append);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'AppendTest'; /* eslint-env node, mocha, browser */
/* global expect, $ */

const insertHTML = '<div class="inserted"></div>';

describe('"append"', () => {
  before(() => $.html(`<div id="${ testID }"></div>`));
  beforeEach(() => {
    $.id(testID).innerHTML = `<span></span>`;
  });

  after(() => $.remove(testID));

  it('Should append plain HTML to a DOM element', () => {
    const node = $.id(testID);

    expect(node.lastChild).not.to.have.attribute('class', 'inserted');
    (0, _append2.default)(node, insertHTML);
    expect(node.lastChild).to.have.attribute('class', 'inserted');
  });

  it('Should append DOM element to a DOM element', () => {
    const node = $.id(testID);
    const div = $.create('div');
    div.className = 'inserted';

    expect(node.lastChild).not.to.have.attribute('class', 'inserted');
    (0, _append2.default)(node, div);
    expect(node.lastChild).to.have.attribute('class', 'inserted');
  });

  it('Should append to DOM elements not inserted into the DOM', () => {
    const div = $.create('div');

    (0, _append2.default)(div, insertHTML);

    expect(div.lastChild).not.to.be.null;
    expect(div.lastChild).to.have.attribute('class', 'inserted');
  });

  it('Should move element from one DOM element to another', () => {
    const node = $.id(testID);
    node.innerHTML = `<div id="NewContainer"></div><div id="Moved"></div>`;

    const moveDiv = $.id('Moved');
    const newCont = $.id('NewContainer');

    expect(node.lastChild).to.have.id('Moved');
    expect(newCont.lastChild).to.be.null;

    // Append the "move div" to the "new container"
    (0, _append2.default)(newCont, moveDiv);

    expect(node.lastChild).to.have.id('NewContainer');
    expect(newCont.lastChild).not.to.be.null;
    expect(newCont.lastChild).to.have.id('Moved');
  });

  it('Should always return the inserted DOM element', () => {
    const node = $.id(testID);

    const div = $.create('div');
    div.className = 'inserted-always-dom';

    expect((0, _append2.default)(node, div)).to.have.class('inserted-always-dom');
    expect((0, _append2.default)(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should return null when ister fails DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect((0, _append2.default)(document.parentNode, insertHTML)).to.be.null;
    expect((0, _append2.default)(null, insertHTML)).to.be.null;
    expect((0, _append2.default)({}, insertHTML)).to.be.null;
  });
});