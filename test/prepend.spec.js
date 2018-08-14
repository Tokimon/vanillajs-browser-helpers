/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it, before, beforeEach, after } from './assets/init-test';

import prepend from '../prepend';



const testID = 'AppendTest';
const insertHTML = '<div class="inserted"></div>';



describe('"prepend"', () => {
  before(() => testUtils.html(`<div id="${testID}"></div>`));
  beforeEach(() => { testUtils.id(testID).innerHTML = `<span></span>`; });

  after(() => testUtils.remove(testID));

  it('Should prepend plain HTML to a DOM element', () => {
    const node = testUtils.id(testID);

    expect(node.firstChild).not.to.have.attribute('class', 'inserted');
    prepend(node, insertHTML);
    expect(node.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should prepend DOM element to a DOM element', () => {
    const node = testUtils.id(testID);
    const div = testUtils.create('div');
    div.className = 'inserted';

    expect(node.firstChild).not.to.have.attribute('class', 'inserted');
    prepend(node, div);
    expect(node.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should prepend to DOM elements not inserted into the DOM', () => {
    const div = testUtils.create('div');

    prepend(div, insertHTML);

    expect(div.firstChild).not.to.be.null;
    expect(div.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should move element from one DOM element to another', () => {
    const node = testUtils.id(testID);
    node.innerHTML = `<div id="Moved"></div><div id="NewContainer"></div>`;

    const moveDiv = testUtils.id('Moved');
    const newCont = testUtils.id('NewContainer');

    expect(node.firstChild).to.have.id('Moved');
    expect(newCont.firstChild).to.be.null;

    prepend(newCont, moveDiv);

    expect(node.firstChild).to.have.id('NewContainer');
    expect(newCont.firstChild).not.to.be.null;
    expect(newCont.firstChild).to.have.id('Moved');
  });

  it('Should always return the inserted DOM element', () => {
    const node = testUtils.id(testID);

    const div = testUtils.create('div');
    div.className = 'inserted-always-dom';

    expect(prepend(node, div)).to.have.class('inserted-always-dom');
    expect(prepend(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should return null when ister fails DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(prepend(document.parentNode, insertHTML)).to.be.null;
    expect(prepend(null, insertHTML)).to.be.null;
    expect(prepend({}, insertHTML)).to.be.null;
  });
});
