/* eslint-env node, mocha, browser */
/* global expect, $ */

import isDOMDocument from '../isDOMDocument';

describe('"isDOMDocument"', () => {
  it('Should only return true for Document node elements', () => {
    expect(isDOMDocument(document)).to.be.true;
    expect(isDOMDocument({ nodeType: 9 })).to.be.true;
  });

  it('Should return false for non Document node elements', () => {
    expect(isDOMDocument(window)).to.be.false;
    expect(isDOMDocument(document.documentElement)).to.be.false;
    expect(isDOMDocument(document.body)).to.be.false;
    expect(isDOMDocument(null)).to.be.false;
    expect(isDOMDocument({})).to.be.false;
    expect(isDOMDocument()).to.be.false;
  });
});
