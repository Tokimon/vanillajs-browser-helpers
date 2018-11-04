import { expect, helpers, describe, it } from './assets/init-test';

import isDOMFragment from '../isDOMFragment';



describe('"isDOMFragment"', () => {
  it('Should only return true for a Document fragment', () => {
    expect(isDOMFragment(document.createDocumentFragment())).to.equal(true);
  });

  it('Should return false for non Document fragments', () => {
    expect(isDOMFragment(document.documentElement)).to.equal(false);
    expect(isDOMFragment(document.body)).to.equal(false);
    expect(isDOMFragment(document)).to.equal(false);
    expect(isDOMFragment(helpers.create('p'))).to.equal(false);
    expect(isDOMFragment(document.createTextNode(''))).to.equal(false);
    expect(isDOMFragment(document.createComment(''))).to.equal(false);
    expect(isDOMFragment(window)).to.equal(false);
    expect(isDOMFragment(null)).to.equal(false);
    expect(isDOMFragment({})).to.equal(false);
    expect(isDOMFragment({ nodeType: 1 })).to.equal(false);
    expect(isDOMFragment()).to.equal(false);
  });
});
