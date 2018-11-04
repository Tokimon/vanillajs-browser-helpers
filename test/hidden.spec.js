import { expect, helpers, describe, it, before, after } from './assets/init-test';

import hidden from '../hidden';



const testID = 'TestNode';



describe('"hidden"', () => {
  before(() => helpers.html(`
  <style id="Style">
  #${testID} { display: none; }
  #NotVisible { visibility: hidden; }
  div { height: 10px; }
  </style>
  <div id="${testID}"><div id="ChildDisplay"></div></div>
  <div id="NotVisible"><div id="ChildVisibility"></div></div>
  <div id="Visible"></div>
  `));

  after(() => {
    [testID, 'Style', 'NotVisible', 'Visible']
      .forEach((id) => { helpers.remove(id); });
  });

  it('Should return true if DOM element is "display: none"', () => {
    const node = helpers.id(testID);
    expect(hidden(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is "display: none"', () => {
    const node = helpers.id('ChildDisplay');
    expect(hidden(node)).to.equal(true);
  });

  it('Should return true if DOM element is "visibility: hidden"', () => {
    const node = helpers.id('NotVisible');
    expect(hidden(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = helpers.id('ChildVisibility');
    expect(hidden(node)).to.equal(true);
  });

  it('Should return true if DOM element is not in the DOM', () => {
    const node = helpers.create('div');
    expect(hidden(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is not in the DOM', () => {
    const node = helpers.create('div');
    node.innerHTML = '<p></p>';
    expect(hidden(node.firstChild)).to.equal(true);
  });

  it('Should return false if DOM element is in the DOM and is not styled hidden', () => {
    const node = helpers.id('Visible');
    expect(hidden(node)).to.equal(false);
  });

  it('Should return true for non DOM elements', () => {
    expect(hidden(null)).to.equal(true);
  });
});
