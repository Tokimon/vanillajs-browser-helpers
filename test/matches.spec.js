/* eslint-env node, mocha, browser */
/* global expect, $ */

import matches from '../matches';

const testID = 'TestNode';

describe('"matches"', () => {
  before(() => $.html(`<div id="${testID}"><span class="class"><b></b></span></div>`));
  after(() => $.remove(testID));

  it('Should indicate if a DOM element matches a given CSS selector', () => {
    const node = $.id(testID);

    // expect(matches(node, '#testID')).to.be.true;
    expect(matches(node, '.class')).to.be.false;
    expect(matches(node.firstChild, '#testID')).to.be.false;
    // expect(matches(node.firstChild, '.class')).to.be.true;
    expect(matches(node.firstChild.firstChild, '#testID')).to.be.false;
    expect(matches(node.firstChild.firstChild, '.class')).to.be.false;
    // expect(matches(document.body, 'body')).to.be.true;
    expect(matches(document.body, 'html')).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect(matches(null)).to.be.false;
    expect(matches({})).to.be.false;
    expect(matches()).to.be.false;
  });
});
