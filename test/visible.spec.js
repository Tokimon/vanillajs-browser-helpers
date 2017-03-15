/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $ */

import visible from '../visible';

const testID = 'TestNode';

describe('"visible"', () => {
  before(() => $.html(`
  <style id="Style">
  #${testID} { display: none; }
  #NotVisible { visibility: hidden; }
  #Collapsed { height: 0; overflow: hidden; }
  #Transparent { opacity: 0; }
  div { height: 10px; }
  </style>
  <div id="${testID}"><div id="ChildDisplay"></div></div>
  <div id="NotVisible"><div id="ChildVisibility"></div></div>
  <div id="Collapsed"><div id="ChildCollapsed"></div></div>
  <div id="Transparent"><div id="ChildTransparent"></div></div>
  <div id="Visible"></div>
  `));

  after(() => {
    [testID, 'Style', 'NotVisible', 'Visible', 'Collapsed', 'Transparent']
      .forEach((id) => { $.remove(id); });
  });

  it('Should return false if DOM element is "display: none"', () => {
    const node = $.id(testID);
    expect(visible(node)).to.be.false;
  });

  it('Should return false if DOM element is a child of an element that is "display: none"', () => {
    const node = $.id('ChildDisplay');
    expect(visible(node)).to.be.false;
  });

  it('Should return false if DOM element is "visibility: hidden"', () => {
    const node = $.id('NotVisible');
    expect(visible(node)).to.be.false;
  });

  it('Should return false if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = $.id('ChildVisibility');
    expect(visible(node)).to.be.false;
  });

  it('Should return false if DOM element is Collapsed', () => {
    const node = $.id('Collapsed');
    expect(visible(node)).to.be.false;
  });

  it('Should return false if DOM element is a child of an element that is Collapsed', () => {
    const node = $.id('Collapsed');
    expect(visible(node.firstChild)).to.be.false;
  });

  it('Should return false if DOM element is Transparent', () => {
    const node = $.id('Transparent');
    expect(visible(node)).to.be.false;
  });

  it('Should return false if DOM element is a child of an element that is Transparent', () => {
    const node = $.id('Transparent');
    expect(visible(node.firstChild)).to.be.false;
  });

  it('Should return false if DOM element is not in the DOM', () => {
    const node = $.create('div');
    expect(visible(node)).to.be.false;
  });

  it('Should return false if DOM element is a child of an element that is not in the DOM', () => {
    const node = $.create('div');
    node.innerHTML = '<p></p>';
    expect(visible(node.firstChild)).to.be.false;
  });

  it('Should return true if DOM element is in the DOM and is not styled invisible', () => {
    const node = $.id('Visible');
    expect(visible(node)).to.be.true;
  });

  it('Should return false for non DOM elements', () => {
    expect(visible(null)).to.be.false;
  });
});
