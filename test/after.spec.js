import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import _after from '../after';



const testID = 'AfterTest';
const nodeID = 'AfterNode';



describe('"after"', () => {
  before(() => helpers.html(`<div id="${testID}"></div>`));
  beforeEach(() => { helpers.id(testID).innerHTML = `<div id="${nodeID}"></div>`; });

  after(() => helpers.remove(testID));

  it('Should insert plain HTML after a DOM element', () => {
    const node = helpers.id(nodeID);

    expect(node.nextSibling).to.equal(null);

    _after(node, '<div class="inserted-html"></div>');

    expect(node.nextSibling).to.not.equal(null);
    expect(node.nextSibling).to.have.class('inserted-html');
  });

  it('Should insert DOM element after a DOM element', () => {
    const node = helpers.id(nodeID);
    const div = helpers.create('div');
    div.className = 'inserted-dom';

    expect(node.nextSibling).to.equal(null);

    _after(node, div);

    expect(node.nextSibling).to.not.equal(null);
    expect(node.nextSibling).to.have.class('inserted-dom');
  });

  it('Should always return the inserted DOM element', () => {
    const node = helpers.id(nodeID);

    const div = helpers.create('div');
    div.className = 'inserted-always-dom';

    expect(_after(node, div)).to.have.class('inserted-always-dom');
    expect(_after(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should ignore and return NULL for the <HTML> element', () => {
    const htmlNext = document.documentElement.nextSibling;
    expect(_after(document.documentElement, helpers.create('div'))).to.equal(null);
    expect(document.documentElement.nextSibling).to.equal(htmlNext);
  });

  it('Should ignore and return NULL for DOM elements not inserted into the DOM', () => {
    const div = helpers.create('div');
    expect(_after(div, helpers.create('div'))).to.equal(null);
    expect(div.nextSibling).to.equal(null);
  });

  it('Should ignore and return NULL for non DOM elements', () => {
    const insert = helpers.create('div');
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(_after(document.parentNode, insert)).to.equal(null);
    expect(_after(null, insert)).to.equal(null);
    expect(_after({}, insert)).to.equal(null);
  });
});
