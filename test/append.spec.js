import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import append from '../append';



const testID = 'AppendTest';
const insertHTML = '<div class="inserted"></div>';



describe('"append"', () => {
  before(() => helpers.html(`<div id="${testID}"></div>`));
  beforeEach(() => { helpers.id(testID).innerHTML = `<span></span>`; });

  after(() => helpers.remove(testID));

  it('Should append plain HTML to a DOM element', () => {
    const node = helpers.id(testID);

    expect(node.lastChild).not.to.have.attribute('class', 'inserted');
    append(node, insertHTML);
    expect(node.lastChild).to.have.attribute('class', 'inserted');
  });

  it('Should append DOM element to a DOM element', () => {
    const node = helpers.id(testID);
    const div = helpers.create('div');
    div.className = 'inserted';

    expect(node.lastChild).not.to.have.attribute('class', 'inserted');
    append(node, div);
    expect(node.lastChild).to.have.attribute('class', 'inserted');
  });

  it('Should append to DOM elements not inserted into the DOM', () => {
    const div = helpers.create('div');

    append(div, insertHTML);

    expect(div.lastChild).not.to.equal(null);
    expect(div.lastChild).to.have.attribute('class', 'inserted');
  });

  it('Should move element from one DOM element to another', () => {
    const node = helpers.id(testID);
    node.innerHTML = `<div id="NewContainer"></div><div id="Moved"></div>`;

    const moveDiv = helpers.id('Moved');
    const newCont = helpers.id('NewContainer');

    expect(node.lastChild).to.have.id('Moved');
    expect(newCont.lastChild).to.equal(null);

    // Append the "move div" to the "new container"
    append(newCont, moveDiv);

    expect(node.lastChild).to.have.id('NewContainer');
    expect(newCont.lastChild).not.to.equal(null);
    expect(newCont.lastChild).to.have.id('Moved');
  });

  it('Should always return the inserted DOM element', () => {
    const node = helpers.id(testID);

    const div = helpers.create('div');
    div.className = 'inserted-always-dom';

    expect(append(node, div)).to.have.class('inserted-always-dom');
    expect(append(node, '<div class="inserted-always-html"></div>')).to.have.class('inserted-always-html');
  });

  it('Should return null when ister fails DOM elements', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(append(document.parentNode, insertHTML)).to.equal(null);
    expect(append(null, insertHTML)).to.equal(null);
    expect(append({}, insertHTML)).to.equal(null);
  });
});
