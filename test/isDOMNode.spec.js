/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $ */

import isDOMNode from '../isDOMNode';

describe('"isDOMNode"', () => {
  it('Should only return true for a HTML nodes', () => {
    // True statements
    expect(isDOMNode(document.documentElement)).to.be.true;
    expect(isDOMNode(document.body)).to.be.true;
    expect(isDOMNode(document)).to.be.true;
    expect(isDOMNode($.create('p'))).to.be.true;
    expect(isDOMNode(document.createDocumentFragment())).to.be.true;
    expect(isDOMNode(document.createTextNode(''))).to.be.true;
    expect(isDOMNode(document.createComment(''))).to.be.true;

    // False statements
    expect(isDOMNode(window)).to.be.false;
  });

  it('Should return false for non HTML nodes', () => {
    expect(isDOMNode(null)).to.be.false;
    expect(isDOMNode({})).to.be.false;
    expect(isDOMNode({ nodeType: 1 })).to.be.false;
    expect(isDOMNode()).to.be.false;
  });
});
