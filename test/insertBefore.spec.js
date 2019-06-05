/* eslint-disable no-unused-expressions */

import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import insertBefore from '../insertBefore';



const testID = 'InsertBeforeTest';
const nodeID = 'InsertBeforeNode';



describe('"insertBefore" >', () => {
  before(() => helpers.html(`<div id="${testID}"></div>`));
  beforeEach(() => { helpers.id(testID).innerHTML = `<div id="${nodeID}"></div>`; });
  after(() => helpers.remove(testID));

  it('Should insert DOM element before a DOM element', () => {
    const node = helpers.id(nodeID);
    const div = helpers.create('div');
    div.className = 'inserted-dom';

    insertBefore(node, div);
    expect(node.previousSibling).to.have.attribute('class', 'inserted-dom');
  });

  it('Should insert plain HTML before a DOM element', () => {
    const node = helpers.id(nodeID);

    insertBefore(node, '<div class="inserted-html"></div>');
    expect(node.previousSibling).to.have.attribute('class', 'inserted-html');
  });

  it('Should convert selector to a DOM element and insert it before a DOM element', () => {
    const node = helpers.id(nodeID);

    insertBefore(node, '.selector-element');
    expect(node.previousSibling).to.have.class('selector-element');
  });

  it('Should always return the inserted DOM element', () => {
    const node = helpers.id(nodeID);

    const div = helpers.create('div');
    div.className = 'inserted-always-dom';

    expect(insertBefore(node, div)).to.have.class('inserted-always-dom');
    expect(insertBefore(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should ignore and return `undefined` for the <HTML> element', () => {
    const htmlPrev = document.documentElement.previousSibling;
    expect(insertBefore(document.documentElement, helpers.create('div'))).to.equal(undefined);
    expect(document.documentElement.previousSibling).to.equal(htmlPrev);
  });

  it('Should ignore and return `undefined` DOM elements not inserted into the DOM', () => {
    const div = helpers.create('div');
    expect(insertBefore(div, helpers.create('div'))).to.equal(undefined);
    expect(div.previousSibling).to.equal(null);
  });

  it('Should ignore and return `undefined` non DOM elements', () => {
    const insert = helpers.create('div');
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(insertBefore(document.parentNode, insert)).to.equal(undefined);
    expect(insertBefore(null, insert)).to.equal(undefined);
    expect(insertBefore({}, insert)).to.equal(undefined);
  });
});
