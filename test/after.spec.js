/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $ */

import _after from '../after';

const testID = 'AfterTest';
const nodeID = 'AfterNode';

describe('"after"', () => {
  before(() => $.html(`<div id="${testID}"></div>`));
  beforeEach(() => { $.id(testID).innerHTML = `<div id="${nodeID}"></div>`; });

  after(() => $.remove(testID));

  it('Should insert plain HTML after a DOM element', () => {
    const node = $.id(nodeID);

    expect(node.nextSibling).to.be.null;

    _after(node, '<div class="inserted-html"></div>');

    expect(node.nextSibling).to.not.be.null;
    expect(node.nextSibling).to.have.class('inserted-html');
  });

  it('Should insert DOM element after a DOM element', () => {
    const node = $.id(nodeID);
    const div = $.create('div');
    div.className = 'inserted-dom';

    expect(node.nextSibling).to.be.null;

    _after(node, div);

    expect(node.nextSibling).to.not.be.null;
    expect(node.nextSibling).to.have.class('inserted-dom');
  });

  it('Should always return the inserted DOM element', () => {
    const node = $.id(nodeID);

    const div = $.create('div');
    div.className = 'inserted-always-dom';

    expect(_after(node, div)).to.have.class('inserted-always-dom');
    expect(_after(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should ignore and return NULL for the <HTML> element', () => {
    const htmlNext = document.documentElement.nextSibling;
    expect(_after(document.documentElement, $.create('div'))).to.be.null;
    expect(document.documentElement.nextSibling).to.equal(htmlNext);
  });

  it('Should ignore and return NULL for DOM elements not inserted into the DOM', () => {
    const div = $.create('div');
    expect(_after(div, $.create('div'))).to.be.null;
    expect(div.nextSibling).to.be.null;
  });

  it('Should ignore and return NULL for non DOM elements', () => {
    const insert = $.create('div');
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(_after(document.parentNode, insert)).to.be.null;
    expect(_after(null, insert)).to.be.null;
    expect(_after({}, insert)).to.be.null;
  });
});
