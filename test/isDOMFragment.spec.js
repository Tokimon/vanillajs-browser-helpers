/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $ */

import isDOMFragment from '../isDOMFragment';

describe('"isDOMFragment"', () => {
  it('Should only return true for a Document fragment', () => {
    // True statements
    expect(isDOMFragment(document.createDocumentFragment())).to.be.true;
  });

  it('Should return false for non Document fragments', () => {
    expect(isDOMFragment(document.documentElement)).to.be.false;
    expect(isDOMFragment(document.body)).to.be.false;
    expect(isDOMFragment(document)).to.be.false;
    expect(isDOMFragment($.create('p'))).to.be.false;
    expect(isDOMFragment(document.createTextNode(''))).to.be.false;
    expect(isDOMFragment(document.createComment(''))).to.be.false;
    expect(isDOMFragment(window)).to.be.false;
    expect(isDOMFragment(null)).to.be.false;
    expect(isDOMFragment({})).to.be.false;
    expect(isDOMFragment({ nodeType: 1 })).to.be.false;
    expect(isDOMFragment()).to.be.false;
  });
});
