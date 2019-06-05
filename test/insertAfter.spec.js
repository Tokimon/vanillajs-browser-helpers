import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import insertAfter from '../insertAfter';



const testID = 'InsertAfterTest';
const nodeID = 'InsertAfterNode';



describe('"insertAfter" >', () => {
  before(() => helpers.html(`<div id="${testID}"></div>`));
  beforeEach(() => { helpers.id(testID).innerHTML = `<div id="${nodeID}"></div>`; });

  after(() => helpers.remove(testID));

  it('Should insert DOM element after a DOM element', () => {
    const node = helpers.id(nodeID);
    const div = helpers.create('div');
    div.className = 'inserted-dom';

    insertAfter(node, div);
    expect(node.nextSibling).to.have.class('inserted-dom');
  });

  it('Should insert plain HTML after a DOM element', () => {
    const node = helpers.id(nodeID);

    insertAfter(node, '<div class="inserted-html"></div>');
    expect(node.nextSibling).to.have.class('inserted-html');
  });

  it('Should convert selector to a DOM element and insert it after a DOM element', () => {
    const node = helpers.id(nodeID);

    insertAfter(node, '.selector-element');
    expect(node.nextSibling).to.have.class('selector-element');
  });

  it('Should always return the inserted DOM element', () => {
    const node = helpers.id(nodeID);

    const div = helpers.create('div');
    div.className = 'inserted-always-dom';

    expect(insertAfter(node, div)).to.have.class('inserted-always-dom');
    expect(insertAfter(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should ignore and return `undefined` for the <HTML> element', () => {
    const htmlNext = document.documentElement.nextSibling;
    expect(insertAfter(document.documentElement, helpers.create('div'))).to.equal(undefined);
    expect(document.documentElement.nextSibling).to.equal(htmlNext);
  });

  it('Should ignore and return `undefined` for DOM elements not inserted into the DOM', () => {
    const div = helpers.create('div');
    expect(insertAfter(div, helpers.create('div'))).to.equal(undefined);
    expect(div.nextSibling).to.equal(null);
  });

  it('Should ignore and return `undefined` for non DOM elements', () => {
    const insert = helpers.create('div');
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(insertAfter(document.parentNode, insert)).to.equal(undefined);
    expect(insertAfter(null, insert)).to.equal(undefined);
    expect(insertAfter({}, insert)).to.equal(undefined);
  });
});
