/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it, before, after } from './assets/init-test';

import remove from '../remove';



const testID = 'TestNode';



describe('"remove"', () => {
  before(() => testUtils.html(`<div id="${testID}"><div id="child"></div></div>`));
  after(() => testUtils.remove(testID));

  it('Should always return the removed element', () => {
    expect(remove(null)).to.be.null;
    expect(remove(document)).to.equal(document);
    expect(remove(window)).to.equal(window);

    const child = testUtils.id('child');
    expect(remove(child)).to.equal(child);
  });

  it('Should ignore non DOM child elements', () => {
    expect(remove(null)).to.not.fail;
    expect(remove(document)).to.not.fail;
    expect(remove(document.documentElement)).to.not.fail;
    expect(remove(window)).to.not.fail;
  });

  it('Should remove a given DOM element', () => {
    const tester = testUtils.id(testID);
    remove(tester);
    expect(tester.parentNode).to.be.null;
    expect(testUtils.id(testID)).to.be.null;
  });
});
