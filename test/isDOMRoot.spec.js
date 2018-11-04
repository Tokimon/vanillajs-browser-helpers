import { expect, helpers, describe, it } from './assets/init-test';

import isDOMRoot from '../isDOMRoot';



describe('"isDOMRoot"', () => {
  it('Should only return true for the DOM element', () => {
    // True statements
    expect(isDOMRoot(document.documentElement)).to.equal(true);

    // False statements
    expect(isDOMRoot(document.body)).to.equal(false);
    expect(isDOMRoot(document)).to.equal(false);
    expect(isDOMRoot(helpers.create('html'))).to.equal(false);
    expect(isDOMRoot(document.implementation.createHTMLDocument('').documentElement)).to.equal(false);
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMRoot(null)).to.equal(false);
    expect(isDOMRoot({})).to.equal(false);
    expect(isDOMRoot({ parentNode: { nodeType: 9 } })).to.equal(false);
    expect(isDOMRoot()).to.equal(false);
  });
});
