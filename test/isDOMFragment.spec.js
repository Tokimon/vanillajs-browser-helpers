/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it } from './assets/init-test';

import isDOMFragment from '../isDOMFragment';



describe('"isDOMFragment"', () => {
  it('Should only return true for a Document fragment', () => {
    expect(isDOMFragment(document.createDocumentFragment())).to.be.true;
  });

  it('Should return false for non Document fragments', () => {
    expect(isDOMFragment(document.documentElement)).to.be.false;
    expect(isDOMFragment(document.body)).to.be.false;
    expect(isDOMFragment(document)).to.be.false;
    expect(isDOMFragment(testUtils.create('p'))).to.be.false;
    expect(isDOMFragment(document.createTextNode(''))).to.be.false;
    expect(isDOMFragment(document.createComment(''))).to.be.false;
    expect(isDOMFragment(window)).to.be.false;
    expect(isDOMFragment(null)).to.be.false;
    expect(isDOMFragment({})).to.be.false;
    expect(isDOMFragment({ nodeType: 1 })).to.be.false;
    expect(isDOMFragment()).to.be.false;
  });
});
