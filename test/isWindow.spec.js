/* eslint-env node, mocha, browser */
/* global expect, $ */

import isWindow from '../isWindow';

describe('"isWindow"', () => {
  it('Should return true for window elements', () => {
    expect(isWindow(window)).to.be.true;

    const iframe = $.create('iframe');
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);

    expect(isWindow(iframe)).to.be.false;
    expect(isWindow(iframe.contentWindow)).to.be.true;

    document.body.removeChild(iframe);
  });

  it('Should return false for non window values', () => {
    expect(isWindow(null)).to.be.false;
    expect(isWindow({})).to.be.false;
    expect(isWindow(document)).to.be.false;
    expect(isWindow(document.body)).to.be.false;
    expect(isWindow(document.documentElement)).to.be.false;
    expect(isWindow()).to.be.false;
  });
});
