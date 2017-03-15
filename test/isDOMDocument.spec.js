/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $ */

import isDOMDocument from '../isDOMDocument';

describe('"isDOMDocument"', () => {
  it('Should only return true for Document node elements', () => {
    expect(isDOMDocument(document)).to.be.true;

    const iframe = $.create('iframe');
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);

    expect(isDOMDocument(iframe.contentDocument)).to.be.true;

    document.body.removeChild(iframe);
  });

  it('Should return false for non Document node elements', () => {
    expect(isDOMDocument(window)).to.be.false;
    expect(isDOMDocument(document.documentElement)).to.be.false;
    expect(isDOMDocument(document.body)).to.be.false;
    expect(isDOMDocument(null)).to.be.false;
    expect(isDOMDocument({})).to.be.false;
    expect(isDOMDocument({ nodeType: 9 })).to.be.false;
    expect(isDOMDocument()).to.be.false;
  });
});
