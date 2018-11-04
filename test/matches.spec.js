import { expect, helpers, describe, it, before, after } from './assets/init-test';

import matches from '../matches';



const testID = 'TestNode';



describe('"matches"', () => {
  before(() => helpers.html(`<div id="${testID}"><span class="class"><b></b></span></div>`));
  after(() => helpers.remove(testID));

  it('Should indicate if a DOM element matches a given CSS selector', () => {
    const node = helpers.id(testID);

    // expect(matches(node, '#testID')).to.equal(true);
    expect(matches(node, '.class')).to.equal(false);
    expect(matches(node.firstChild, '#testID')).to.equal(false);
    // expect(matches(node.firstChild, '.class')).to.equal(true);
    expect(matches(node.firstChild.firstChild, '#testID')).to.equal(false);
    expect(matches(node.firstChild.firstChild, '.class')).to.equal(false);
    // expect(matches(document.body, 'body')).to.equal(true);
    expect(matches(document.body, 'html')).to.equal(false);
  });

  it('Should return false for non DOM elements', () => {
    expect(matches(null)).to.equal(false);
    expect(matches({})).to.equal(false);
    expect(matches()).to.equal(false);
  });
});
