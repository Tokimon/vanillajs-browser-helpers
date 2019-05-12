import { expect, helpers, describe, it, before, after } from './assets/init-test';

import invisible from '../invisible';



const testID = 'InvisibleTest';



describe('"invisible" >', () => {
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

  it('Should return true if DOM element is "display: none"', () => {
    const node = helpers.id('NoDisplay');
    expect(invisible(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is "display: none"', () => {
    const node = helpers.id('ChildDisplay');
    expect(invisible(node)).to.equal(true);
  });

  it('Should return true if DOM element is "visibility: hidden"', () => {
    const node = helpers.id('NotVisible');
    expect(invisible(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = helpers.id('ChildVisibility');
    expect(invisible(node)).to.equal(true);
  });

  it('Should return true if DOM element is Collapsed', () => {
    const node = helpers.id('Collapsed');
    expect(invisible(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is Collapsed', () => {
    const node = helpers.id('Collapsed');
    expect(invisible(node.firstChild)).to.equal(true);
  });

  it('Should return true if DOM element is Transparent', () => {
    const node = helpers.id('Transparent');
    expect(invisible(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is Transparent', () => {
    const node = helpers.id('Transparent');
    expect(invisible(node.firstChild)).to.equal(true);
  });

  it('Should return true if DOM element is not in the DOM', () => {
    const node = helpers.create('div');
    expect(invisible(node)).to.equal(true);
  });

  it('Should return true if DOM element is a child of an element that is not in the DOM', () => {
    const node = helpers.create('div');
    node.innerHTML = '<p></p>';
    expect(invisible(node.firstChild)).to.equal(true);
  });

  it('Should return false if DOM element is in the DOM and is not styled invisible', () => {
    const node = helpers.id('Visible');
    expect(invisible(node)).to.equal(false);
  });

  it('Should return true for non DOM elements', () => {
    expect(invisible(null)).to.equal(true);
  });
});
