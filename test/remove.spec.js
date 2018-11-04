/* eslint-disable no-unused-expressions */

import { expect, helpers, describe, it, before, after } from './assets/init-test';

import remove from '../remove';



const testID = 'TestNode';



describe('"remove"', () => {
  before(() => helpers.html(`<div id="${testID}"><div id="child"></div></div>`));
  after(() => helpers.remove(testID));

  it('Should always return the removed element', () => {
    expect(remove(null)).to.equal(null);
    expect(remove(document)).to.equal(document);
    expect(remove(window)).to.equal(window);

    const child = helpers.id('child');
    expect(remove(child)).to.equal(child);
  });

  it('Should ignore non DOM child elements', () => {
    expect(remove(null)).to.not.fail;
    expect(remove(document)).to.not.fail;
    expect(remove(document.documentElement)).to.not.fail;
    expect(remove(window)).to.not.fail;
  });

  it('Should remove a given DOM element', () => {
    const tester = helpers.id(testID);
    remove(tester);
    expect(tester.parentNode).to.equal(null);
    expect(helpers.id(testID)).to.equal(null);
  });
});
