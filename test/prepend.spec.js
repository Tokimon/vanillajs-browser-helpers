import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import prepend from '../prepend';



const testID = 'AppendTest';
const insertHTML = '<div class="inserted"></div>';



describe('"prepend"', () => {
  before(() => helpers.html(`<div id="${testID}"></div>`));
  beforeEach(() => { helpers.id(testID).innerHTML = `<span></span>`; });

  after(() => helpers.remove(testID));

  it('Should prepend plain HTML to a DOM element', () => {
    const node = helpers.id(testID);

    expect(node.firstChild).not.to.have.attribute('class', 'inserted');
    prepend(node, insertHTML);
    expect(node.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should prepend DOM element to a DOM element', () => {
    const node = helpers.id(testID);
    const div = helpers.create('div');
    div.className = 'inserted';

    expect(node.firstChild).not.to.have.attribute('class', 'inserted');
    prepend(node, div);
    expect(node.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should prepend to DOM elements not inserted into the DOM', () => {
    const div = helpers.create('div');

    prepend(div, insertHTML);

    expect(div.firstChild).not.to.equal(null);
    expect(div.firstChild).to.have.attribute('class', 'inserted');
  });

  it('Should move element from one DOM element to another', () => {
    const node = helpers.id(testID);
    node.innerHTML = `<div id="Moved"></div><div id="NewContainer"></div>`;

    const moveDiv = helpers.id('Moved');
    const newCont = helpers.id('NewContainer');

    expect(node.firstChild).to.have.id('Moved');
    expect(newCont.firstChild).to.equal(null);

    prepend(newCont, moveDiv);

    expect(node.firstChild).to.have.id('NewContainer');
    expect(newCont.firstChild).not.to.equal(null);
    expect(newCont.firstChild).to.have.id('Moved');
  });

  it('Should always return the inserted DOM element', () => {
    const node = helpers.id(testID);

    const div = helpers.create('div');
    div.className = 'inserted-always-dom';

    expect(prepend(node, div)).to.have.class('inserted-always-dom');
    expect(prepend(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should return null when ister fails DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(prepend(document.parentNode, insertHTML)).to.equal(null);
    expect(prepend(null, insertHTML)).to.equal(null);
    expect(prepend({}, insertHTML)).to.equal(null);
  });
});
