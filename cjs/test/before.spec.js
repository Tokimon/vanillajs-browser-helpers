var _before2 = require('../before');

var _before3 = _interopRequireDefault(_before2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'BeforeTest'; /* eslint-env node, mocha, browser */
/* global expect, $ */

const nodeID = 'BeforeNode';
const insertHTML = '<div class="inserted"></div>';

describe('"before"', () => {
  before(() => $.html(`<div id="${ testID }"></div>`));
  beforeEach(() => {
    $.id(testID).innerHTML = `<div id="${ nodeID }"></div>`;
  });

  after(() => $.remove(testID));

  it('Should insert plain HTML before a DOM element', () => {
    const node = $.id(nodeID);

    expect(node.previousSibling).to.be.null;

    (0, _before3.default)(node, insertHTML);

    expect(node.previousSibling).to.not.be.null;
    expect(node.previousSibling).to.have.attribute('class', 'inserted');
  });

  it('Should insert DOM element before a DOM element', () => {
    const node = $.id(nodeID);
    const div = $.create('div');
    div.className = 'inserted';

    expect(node.previousSibling).to.be.null;

    (0, _before3.default)(node, div);

    expect(node.previousSibling).to.not.be.null;
    expect(node.previousSibling).to.have.attribute('class', 'inserted');
  });

  it('Should always return the inserted DOM element', () => {
    const node = $.id(nodeID);

    const div = $.create('div');
    div.className = 'inserted-always-dom';

    expect((0, _before3.default)(node, div)).to.have.class('inserted-always-dom');
    expect((0, _before3.default)(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should ignore and return NULL for the <HTML> element', () => {
    const htmlPrev = document.documentElement.previousSibling;
    expect((0, _before3.default)(document.documentElement, $.create('div'))).to.be.null;
    expect(document.documentElement.previousSibling).to.equal(htmlPrev);
  });

  it('Should ignore DOM elements not inserted into the DOM', () => {
    const div = $.create('div');
    expect((0, _before3.default)(div, insertHTML)).to.not.fail;
    expect(div.previousSibling).to.be.null;
  });

  it('Should ignore non DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect((0, _before3.default)(document.parentNode, insertHTML)).to.not.fail;
    expect((0, _before3.default)(null, insertHTML)).to.not.fail;
    expect((0, _before3.default)({}, insertHTML)).to.not.fail;
  });
});