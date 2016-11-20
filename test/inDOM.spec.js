/* eslint-env node, mocha, browser */
/* global expect, $ */

import inDOM from '../inDOM';

describe('"inDOM"', () => {
  it('Should return true for DOM elements actually in the DOM tree', () => {
    // True statements
    expect(inDOM(document.documentElement)).to.be.true;
    expect(inDOM(document.body)).to.be.true;

    // False statements
    expect(inDOM(document)).to.be.false;
    expect(inDOM($.create('p'))).to.be.false;
    expect(inDOM(document.implementation.createHTMLDocument('').documentElement)).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect(inDOM(null)).to.be.false;
    expect(inDOM({})).to.be.false;
    expect(inDOM()).to.be.false;
  });
});
