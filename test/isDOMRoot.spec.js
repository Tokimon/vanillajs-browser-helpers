/* eslint-env node, mocha, browser */
/* global expect, $ */

import isDOMRoot from '../isDOMRoot';

describe('"isDOMRoot"', () => {
  it('Should only return true for the DOM element', () => {
    // True statements
    expect(isDOMRoot(document.documentElement)).to.be.true;

    // False statements
    expect(isDOMRoot(document.body)).to.be.false;
    expect(isDOMRoot(document)).to.be.false;
    expect(isDOMRoot($.create('html'))).to.be.false;
    expect(isDOMRoot(document.implementation.createHTMLDocument('').documentElement)).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMRoot(null)).to.be.false;
    expect(isDOMRoot({})).to.be.false;
    expect(isDOMRoot({ parentNode: { nodeType: 9 } })).to.be.false;
    expect(isDOMRoot()).to.be.false;
  });
});
