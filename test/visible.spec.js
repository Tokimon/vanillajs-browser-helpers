import { expect, helpers, describe, it, before, after } from './assets/init-test';

import visible from '../visible';



const testID = 'VisibleTest';



describe('"visible" >', () => {
  before(() => helpers.html(`
    <div id="${testID}">
      <style id="Style">
        #NoDisplay { display: none; }
        #NotVisible { visibility: hidden; }
        #Collapsed { height: 0; overflow: hidden; }
        #Transparent { opacity: 0; }
        div { height: 10px; }
      </style>
      
      <div id="NoDisplay"><div id="ChildDisplay"></div></div>
      <div id="NotVisible"><div id="ChildVisibility"></div></div>
      <div id="Collapsed"><div id="ChildCollapsed"></div></div>
      <div id="Transparent"><div id="ChildTransparent"></div></div>
      <div id="Visible"></div>
    </div>
  `));

  after(() => helpers.remove(testID));

  it('Should return false if DOM element is "display: none"', () => {
    const node = helpers.id('NoDisplay');
    expect(visible(node)).to.equal(false);
  });

  it('Should return false if DOM element is a child of an element that is "display: none"', () => {
    const node = helpers.id('ChildDisplay');
    expect(visible(node)).to.equal(false);
  });

  it('Should return false if DOM element is "visibility: hidden"', () => {
    const node = helpers.id('NotVisible');
    expect(visible(node)).to.equal(false);
  });

  it('Should return false if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = helpers.id('ChildVisibility');
    expect(visible(node)).to.equal(false);
  });

  it('Should return false if DOM element is Collapsed', () => {
    const node = helpers.id('Collapsed');
    expect(visible(node)).to.equal(false);
  });

  it('Should return false if DOM element is a child of an element that is Collapsed', () => {
    const node = helpers.id('Collapsed');
    expect(visible(node.firstChild)).to.equal(false);
  });

  it('Should return false if DOM element is Transparent', () => {
    const node = helpers.id('Transparent');
    expect(visible(node)).to.equal(false);
  });

  it('Should return false if DOM element is a child of an element that is Transparent', () => {
    const node = helpers.id('Transparent');
    expect(visible(node.firstChild)).to.equal(false);
  });

  it('Should return false if DOM element is not in the DOM', () => {
    const node = helpers.create('div');
    expect(visible(node)).to.equal(false);
  });

  it('Should return false if DOM element is a child of an element that is not in the DOM', () => {
    const node = helpers.create('div');
    node.innerHTML = '<p></p>';
    expect(visible(node.firstChild)).to.equal(false);
  });

  it('Should return true if DOM element is in the DOM and is not styled invisible', () => {
    const node = helpers.id('Visible');
    expect(visible(node)).to.equal(true);
  });

  it('Should return false for non DOM elements', () => {
    expect(visible(null)).to.equal(false);
  });
});
