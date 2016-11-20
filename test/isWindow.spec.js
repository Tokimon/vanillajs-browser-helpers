/* eslint-env node, mocha, browser */
/* global expect, $ */

import isWindow from '../isWindow';

describe('"isWindow"', () => {
  before(() => $.html('<iframe id="iFrame">'));
  after(() => $.remove('iFrame'));

  it('Should return true for window elements', () => {
    const iframe = $.id('iFrame');
    expect(isWindow(window)).to.be.true;
    expect(isWindow(iframe)).to.be.false;
    expect(isWindow(iframe.contentWindow)).to.be.true;

    const fake = {};
    fake.self = fake;
    expect(isWindow(fake)).to.be.true;
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
