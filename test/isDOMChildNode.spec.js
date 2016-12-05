/* eslint-env node, mocha, browser */
/* global expect, $ */

import isDOMChildNode from '../isDOMChildNode';

const testID = 'TestNode';

describe('"isDOMChildNode"', () => {
  before(() => $.html(
`<div id="${testID}">
  <span></span>
</div>`
  ));

  after(() => $.remove(testID));

  it('Should return true for DOM nodes in the DOM below the DOM root element', () => {
    expect(isDOMChildNode(document.body)).to.be.true;
    expect(isDOMChildNode(document.documentElement)).to.be.false;
    expect(isDOMChildNode($.id(testID).firstChild)).to.be.true;
  });

  it('Should return true for child DOM nodes of a DOM element not in the DOM', () => {
    const div = $.create('div');
    div.innerHTML = '<b></b>\ntext';
    expect(isDOMChildNode(div)).to.be.false;
    expect(isDOMChildNode(div.firstChild)).to.be.true;
    expect(isDOMChildNode(div.firstChild.nextSibling)).to.be.true;
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMChildNode(null)).to.be.false;
    expect(isDOMChildNode({})).to.be.false;
    expect(isDOMChildNode({ parentNode: { nodeType: 1 } })).to.be.false;
    expect(isDOMChildNode()).to.be.false;
  });
});
