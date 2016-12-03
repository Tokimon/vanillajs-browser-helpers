/* eslint-env node, mocha, browser */
/* global expect, $ */

import remove from '../remove';

const testID = 'TestNode';

describe('"remove"', () => {
  before(() => $.html(`<div id="${testID}"><div id="child"></div></div>`));
  after(() => $.remove(testID));

  it('Should always return the removed element', () => {
    expect(remove(null)).to.be.null;
    expect(remove(document)).to.equal(document);
    expect(remove(window)).to.equal(window);

    const child = $.id('child');
    expect(remove(child)).to.equal(child);
  });

  it('Should ignore non DOM child elements', () => {
    expect(remove(null)).to.not.fail;
    expect(remove(document)).to.not.fail;
    expect(remove(document.documentElement)).to.not.fail;
    expect(remove(window)).to.not.fail;
  });

  it('Should remove a given DOM element', () => {
    const tester = $.id(testID);
    remove(tester);
    expect(tester.parentNode).to.be.null;
    expect($.id(testID)).to.be.null;
  });
});
