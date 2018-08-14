/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it, before, after } from './assets/init-test';

import hidden from '../hidden';



const testID = 'TestNode';



describe('"hidden"', () => {
  before(() => testUtils.html(`
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
      .forEach((id) => { testUtils.remove(id); });
  });

  it('Should return true if DOM element is "display: none"', () => {
    const node = testUtils.id(testID);
    expect(hidden(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "display: none"', () => {
    const node = testUtils.id('ChildDisplay');
    expect(hidden(node)).to.be.true;
  });

  it('Should return true if DOM element is "visibility: hidden"', () => {
    const node = testUtils.id('NotVisible');
    expect(hidden(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = testUtils.id('ChildVisibility');
    expect(hidden(node)).to.be.true;
  });

  it('Should return true if DOM element is not in the DOM', () => {
    const node = testUtils.create('div');
    expect(hidden(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is not in the DOM', () => {
    const node = testUtils.create('div');
    node.innerHTML = '<p></p>';
    expect(hidden(node.firstChild)).to.be.true;
  });

  it('Should return false if DOM element is in the DOM and is not styled hidden', () => {
    const node = testUtils.id('Visible');
    expect(hidden(node)).to.be.false;
  });

  it('Should return true for non DOM elements', () => {
    expect(hidden(null)).to.be.true;
  });
});
