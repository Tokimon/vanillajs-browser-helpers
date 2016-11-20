/* eslint-env node, mocha, browser */
/* global expect, $ */

import isDOMContainer from '../isDOMContainer';

describe('"isDOMContainer"', () => {
  it('Should only return true for DOM element or Document Fragment', () => {
    // True statements
    expect(isDOMContainer(document.documentElement)).to.be.true;
    expect(isDOMContainer(document.body)).to.be.true;
    expect(isDOMContainer($.create('p'))).to.be.true;
    expect(isDOMContainer(document.createDocumentFragment())).to.be.true;

    // False statements
    expect(isDOMContainer(document)).to.be.false;
    expect(isDOMContainer(document.createComment(''))).to.be.false;
    expect(isDOMContainer(document.createTextNode(''))).to.be.false;
    expect(isDOMContainer(window)).to.be.false;
  });

  it('Should return false for non DOM nodes', () => {
    expect(isDOMContainer(null)).to.be.false;
    expect(isDOMContainer({})).to.be.false;
    expect(isDOMContainer()).to.be.false;
  });
});
