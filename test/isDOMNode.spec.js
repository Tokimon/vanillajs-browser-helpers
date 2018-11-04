import { expect, helpers, describe, it } from './assets/init-test';

import isDOMNode from '../isDOMNode';



describe('"isDOMNode"', () => {
  it('Should only return true for a HTML nodes', () => {
    // True statements
    expect(isDOMNode(document.documentElement)).to.equal(true);
    expect(isDOMNode(document.body)).to.equal(true);
    expect(isDOMNode(document)).to.equal(true);
    expect(isDOMNode(helpers.create('p'))).to.equal(true);
    expect(isDOMNode(document.createDocumentFragment())).to.equal(true);
    expect(isDOMNode(document.createTextNode(''))).to.equal(true);
    expect(isDOMNode(document.createComment(''))).to.equal(true);

    // False statements
    expect(isDOMNode(window)).to.equal(false);
  });

  it('Should return false for non HTML nodes', () => {
    expect(isDOMNode(null)).to.equal(false);
    expect(isDOMNode({})).to.equal(false);
    expect(isDOMNode({ nodeType: 1 })).to.equal(false);
    expect(isDOMNode()).to.equal(false);
  });
});
