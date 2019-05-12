import { expect, helpers, describe, it, before, after } from './assets/init-test';

import hidden from '../hidden';



const testID = 'HiddenTest';



describe('"hidden" >', () => {
  before(() => helpers.html(`
    <div id="${testID}">
      <style id="Style">
        #NoDisplay { display: none; }
        #NotVisible { visibility: hidden; }
        #NoSize { width: 0; height: 0; }
      </style>

      <div id="Visible"></div>
      <div id="NoDisplay"><div id="ChildDisplay"></div></div>
      <div id="NotVisible"><div id="ChildVisibility"></div></div>
      <div id="NoSize"></div>
    </div>
  `));

  after(() => {
    helpers.remove(testID);
  });

  it('Should return true if DOM element is "display: none"', () => {
    const node = helpers.id('NoDisplay');
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

  it('Should return true for DOM element with no size', () => {
    const node = helpers.create('div');
    expect(hidden(node)).to.equal(true);
  });

  it('Should return true for non DOM elements', () => {
    expect(hidden()).to.equal(true);
    expect(hidden(null)).to.equal(true);
  });

  it('Should return false if DOM element is in the DOM and is not styled hidden', () => {
    const node = helpers.id('Visible');
    expect(hidden(node)).to.equal(false);
  });
});
