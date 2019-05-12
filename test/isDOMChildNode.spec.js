import { expect, helpers, describe, it, before, after } from './assets/init-test';

import isDOMChildNode from '../isDOMChildNode';



const testID = 'IsDOMChildNodeTest';



describe('"isDOMChildNode" >', () => {
  before(() => helpers.html(`
    <div id="${testID}">
      <span></span>
    </div>
  `));

  after(() => helpers.remove(testID));

  it('Should return true for DOM nodes in the DOM below the DOM root element', () => {
    expect(isDOMChildNode(document.body)).to.equal(true);
    expect(isDOMChildNode(helpers.id(testID).firstChild)).to.equal(true);
  });

  it('Should return true for child DOM nodes of a DOM element not in the DOM', () => {
    const div = helpers.create('div');
    div.innerHTML = '<b></b>\ntext';
    expect(isDOMChildNode(div)).to.equal(false);
    expect(isDOMChildNode(div.firstChild)).to.equal(true);
    expect(isDOMChildNode(div.firstChild.nextSibling)).to.equal(true);
  });

  it('Should return false for DOM root elements', () => {
    expect(isDOMChildNode(document)).to.equal(false);
    expect(isDOMChildNode(document.documentElement)).to.equal(false);
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMChildNode(null)).to.equal(false);
    expect(isDOMChildNode({})).to.equal(false);
    expect(isDOMChildNode({ parentNode: { nodeType: 1 } })).to.equal(false);
    expect(isDOMChildNode()).to.equal(false);
  });
});
