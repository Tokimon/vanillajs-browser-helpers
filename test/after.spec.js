/* eslint-env node, mocha, browser */
/* global expect, $ */

import _after from '../after';

const testID = 'AfterTest';
const nodeID = 'AfterNode';
const insertHTML = '<div class="inserted"></div>';

describe('"after"', () => {
  before(() => $.html(`<div id="${testID}"></div>`));
  beforeEach(() => $.id(testID).innerHTML = `<div id="${nodeID}"></div>`);

  after(() => $.remove(testID));

  it('Should insert plain HTML after a DOM element', () => {
    const node = $.id(nodeID);

    expect(node.nextSibling).to.be.null;

    _after(node, insertHTML);

    expect(node.nextSibling).to.not.be.null;
    expect(node.nextSibling).to.have.attribute('class', 'inserted');
  });

  it('Should insert DOM element after a DOM element', () => {
    const node = $.id(nodeID);
    const div = $.create('div');
    div.className = 'inserted';

    expect(node.nextSibling).to.be.null;

    _after(node, div);

    expect(node.nextSibling).to.not.be.null;
    expect(node.nextSibling).to.have.attribute('class', 'inserted');
  });

  it('Should ignore DOM element', () => {
    const htmlNext = document.documentElement.nextSibling;
    _after(document.documentElement, insertHTML);
    expect(document.documentElement.nextSibling).to.equal(htmlNext);
  });

  it('Should ignore DOM elements not inserted into the DOM', () => {
    const div = $.create('div');
    expect(_after.bind(null, div, insertHTML)).to.not.fail;
    expect(div.nextSibling).to.be.null;
  });

  it('Should ignore non DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(_after(document.parentNode, insertHTML)).to.not.fail;
    expect(_after(null, insertHTML)).to.not.fail;
    expect(_after({}, insertHTML)).to.not.fail;
  });
});
