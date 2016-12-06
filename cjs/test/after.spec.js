var _after2 = require('../after');

var _after3 = _interopRequireDefault(_after2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'AfterTest'; /* eslint-env node, mocha, browser */
/* global expect, $ */

const nodeID = 'AfterNode';

describe('"after"', () => {
  before(() => $.html(`<div id="${ testID }"></div>`));
  beforeEach(() => {
    $.id(testID).innerHTML = `<div id="${ nodeID }"></div>`;
  });

  after(() => $.remove(testID));

  it('Should insert plain HTML after a DOM element', () => {
    const node = $.id(nodeID);

    expect(node.nextSibling).to.be.null;

    (0, _after3.default)(node, '<div class="inserted-html"></div>');

    expect(node.nextSibling).to.not.be.null;
    expect(node.nextSibling).to.have.class('inserted-html');
  });

  it('Should insert DOM element after a DOM element', () => {
    const node = $.id(nodeID);
    const div = $.create('div');
    div.className = 'inserted-dom';

    expect(node.nextSibling).to.be.null;

    (0, _after3.default)(node, div);

    expect(node.nextSibling).to.not.be.null;
    expect(node.nextSibling).to.have.class('inserted-dom');
  });

  it('Should always return the inserted DOM element', () => {
    const node = $.id(nodeID);

    const div = $.create('div');
    div.className = 'inserted-always-dom';

    expect((0, _after3.default)(node, div)).to.have.class('inserted-always-dom');
    expect((0, _after3.default)(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should ignore and return NULL for the <HTML> element', () => {
    const htmlNext = document.documentElement.nextSibling;
    expect((0, _after3.default)(document.documentElement, $.create('div'))).to.be.null;
    expect(document.documentElement.nextSibling).to.equal(htmlNext);
  });

  it('Should ignore and return NULL for DOM elements not inserted into the DOM', () => {
    const div = $.create('div');
    expect((0, _after3.default)(div, $.create('div'))).to.be.null;
    expect(div.nextSibling).to.be.null;
  });

  it('Should ignore and return NULL for non DOM elements', () => {
    const insert = $.create('div');
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect((0, _after3.default)(document.parentNode, insert)).to.be.null;
    expect((0, _after3.default)(null, insert)).to.be.null;
    expect((0, _after3.default)({}, insert)).to.be.null;
  });
});