/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it, before, after } from './assets/init-test';

import invisible from '../invisible';



const testID = 'TestNode';



describe('"invisible"', () => {
  before(() => testUtils.html(`
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
      .forEach((id) => { testUtils.remove(id); });
  });

  it('Should return true if DOM element is "display: none"', () => {
    const node = testUtils.id(testID);
    expect(invisible(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "display: none"', () => {
    const node = testUtils.id('ChildDisplay');
    expect(invisible(node)).to.be.true;
  });

  it('Should return true if DOM element is "visibility: hidden"', () => {
    const node = testUtils.id('NotVisible');
    expect(invisible(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = testUtils.id('ChildVisibility');
    expect(invisible(node)).to.be.true;
  });

  it('Should return true if DOM element is Collapsed', () => {
    const node = testUtils.id('Collapsed');
    expect(invisible(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is Collapsed', () => {
    const node = testUtils.id('Collapsed');
    expect(invisible(node.firstChild)).to.be.true;
  });

  it('Should return true if DOM element is Transparent', () => {
    const node = testUtils.id('Transparent');
    expect(invisible(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is Transparent', () => {
    const node = testUtils.id('Transparent');
    expect(invisible(node.firstChild)).to.be.true;
  });

  it('Should return true if DOM element is not in the DOM', () => {
    const node = testUtils.create('div');
    expect(invisible(node)).to.be.true;
  });

  it('Should return true if DOM element is a child of an element that is not in the DOM', () => {
    const node = testUtils.create('div');
    node.innerHTML = '<p></p>';
    expect(invisible(node.firstChild)).to.be.true;
  });

  it('Should return false if DOM element is in the DOM and is not styled invisible', () => {
    const node = testUtils.id('Visible');
    expect(invisible(node)).to.be.false;
  });

  it('Should return true for non DOM elements', () => {
    expect(invisible(null)).to.be.true;
  });
});
