import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import prepend from '../prepend';



const testID = 'AppendTest';
const insertHTML = '<div class="inserted"></div>';



describe('"prepend"', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => { helpers.id(testID).innerHTML = `<span></span>`; });

  after(() => helpers.remove(testID));

  it('Should return null when DOM element to append to is not a container element', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(prepend(document.parentNode, insertHTML)).to.equal(null);
    expect(prepend(null, insertHTML)).to.equal(null);
    expect(prepend({}, insertHTML)).to.equal(null);
  });

  it('Should prepend plain HTML to a DOM element', () => {
    prepend(testNode, insertHTML);
    expect(testNode.firstChild.className).to.equal('inserted');
  });

  it('Should prepend DOM element to a DOM element', () => {
    const div = helpers.create('div');
    div.className = 'inserted';

    prepend(testNode, div);
    expect(testNode.firstChild.className).to.equal('inserted');
  });

  it('Should prepend to DOM elements not inserted into the DOM', () => {
    const div = helpers.create('div');

    prepend(div, insertHTML);

    expect(div.firstChild).not.to.equal(null);
    expect(div.firstChild.className).to.equal('inserted');
  });

  it('Should move element from one DOM element to another', () => {
    testNode.innerHTML = `<div class="insert-container"></div><div class="moved"></div>`;

    const insertContainer = helpers.one('.insert-container', testNode);
    const moved = helpers.one('.moved', testNode);

    prepend(insertContainer, moved);

    expect(testNode.firstChild).to.equal(insertContainer);
    expect(insertContainer.firstChild.className).to.equal('moved');
  });

  it('Should always return the inserted DOM element', () => {
    const div = helpers.create('div');
    div.className = 'node';

    const html = '<div class="html"></div>';

    expect(prepend(testNode, div)).to.have.class('node');
    expect(prepend(testNode, html).className).to.equal('html');
  });
});
