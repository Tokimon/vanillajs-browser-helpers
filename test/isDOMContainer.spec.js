import { expect, helpers, describe, it } from './assets/init-test';

import isDOMContainer from '../isDOMContainer';



describe('"isDOMContainer"', () => {
  it('Should only return true for DOM element or Document Fragment', () => {
    // True statements
    expect(isDOMContainer(document.documentElement)).to.equal(true);
    expect(isDOMContainer(document.body)).to.equal(true);
    expect(isDOMContainer(helpers.create('p'))).to.equal(true);
    expect(isDOMContainer(document.createDocumentFragment())).to.equal(true);

    // False statements
    expect(isDOMContainer(document)).to.equal(false);
    expect(isDOMContainer(document.createComment(''))).to.equal(false);
    expect(isDOMContainer(document.createTextNode(''))).to.equal(false);
    expect(isDOMContainer(window)).to.equal(false);
  });

  it('Should return false for non DOM nodes', () => {
    expect(isDOMContainer(null)).to.equal(false);
    expect(isDOMContainer({})).to.equal(false);
    expect(isDOMContainer({ nodeType: 1, parentNode: { nodeType: 1 } })).to.equal(false);
    expect(isDOMContainer()).to.equal(false);
  });
});
