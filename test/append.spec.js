import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import append from '../append';



const testID = 'AppendTest';
const insertHTML = '<div class="inserted"></div>';



describe('"append" >', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => { testNode.innerHTML = `<span></span>`; });

  after(() => helpers.remove(testID));

  it('Should return null when DOM element to append to is not a container element', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(append(document.parentNode, insertHTML)).to.equal(null);
    expect(append(null, insertHTML)).to.equal(null);
    expect(append({}, insertHTML)).to.equal(null);
  });

  it('Should append plain HTML to a DOM element', () => {
    append(testNode, insertHTML);
    expect(testNode.lastChild.className).to.equal('inserted');
  });

  it('Should append DOM element to a DOM element', () => {
    const div = helpers.create('div');
    div.className = 'inserted';

    append(testNode, div);
    expect(testNode.lastChild.className).to.equal('inserted');
  });

  it('Should append to DOM elements not inserted into the DOM', () => {
    const div = helpers.create('div');

    append(div, insertHTML);

    expect(div.lastChild).not.to.equal(null);
    expect(div.lastChild.className).to.equal('inserted');
  });

  it('Should move element from one DOM element to another', () => {
    testNode.innerHTML = `<div class="insert-container"></div><div class="moved"></div>`;

    const insertContainer = helpers.one('.insert-container', testNode);
    const moved = helpers.one('.moved', testNode);

    append(insertContainer, moved);

    expect(testNode.lastChild).to.equal(insertContainer);
    expect(insertContainer.lastChild.className).to.equal('moved');
  });

  it('Should always return the inserted DOM element', () => {
    const div = helpers.create('div');
    div.className = 'node';

    const html = '<div class="html"></div>';

    expect(append(testNode, div)).to.have.class('node');
    expect(append(testNode, html).className).to.equal('html');
  });
});
