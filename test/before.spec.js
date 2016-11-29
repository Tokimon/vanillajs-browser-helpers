/* eslint-env node, mocha, browser */
/* global expect, $ */

import _before from '../before';

const testID = 'BeforeTest';
const nodeID = 'BeforeNode';
const insertHTML = '<div class="inserted"></div>';

describe('"before"', () => {
  before(() => $.html(`<div id="${testID}"></div>`));
  beforeEach(() => { $.id(testID).innerHTML = `<div id="${nodeID}"></div>`; });

  after(() => $.remove(testID));

  it('Should insert plain HTML before a DOM element', () => {
    const node = $.id(nodeID);

    expect(node.previousSibling).to.be.null;

    _before(node, insertHTML);

    expect(node.previousSibling).to.not.be.null;
    expect(node.previousSibling).to.have.attribute('class', 'inserted');
  });

  it('Should insert DOM element before a DOM element', () => {
    const node = $.id(nodeID);
    const div = $.create('div');
    div.className = 'inserted';

    expect(node.previousSibling).to.be.null;

    _before(node, div);

    expect(node.previousSibling).to.not.be.null;
    expect(node.previousSibling).to.have.attribute('class', 'inserted');
  });

  it('Should ignore DOM element', () => {
    const htmlNext = document.documentElement.previousSibling;
    _before(document.documentElement, insertHTML);
    expect(document.documentElement.previousSibling).to.equal(htmlNext);
  });

  it('Should ignore DOM elements not inserted into the DOM', () => {
    const div = $.create('div');
    expect(_before(div, insertHTML)).to.not.fail;
    expect(div.previousSibling).to.be.null;
  });

  it('Should ignore non DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(_before(document.parentNode, insertHTML)).to.not.fail;
    expect(_before(null, insertHTML)).to.not.fail;
    expect(_before({}, insertHTML)).to.not.fail;
  });
});
