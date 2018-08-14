/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it } from './assets/init-test';

import inDOM from '../inDOM';



describe('"inDOM"', () => {
  it('Should return true for DOM elements actually in the DOM tree', () => {
    const hidden = testUtils.create('p');
    hidden.style.cssText = 'width: 0; height: 0; position: absolute; margin: 0; padding: 0; opacity: 0; oveflow: hidden;';

    document.body.appendChild(hidden);

    // True statements
    expect(inDOM(document.documentElement)).to.be.true;
    expect(inDOM(document.body)).to.be.true;
    expect(inDOM(hidden)).to.be.true;

    // False statements
    expect(inDOM(document)).to.be.false;
    expect(inDOM(testUtils.create('p'))).to.be.false;
    expect(inDOM(document.implementation.createHTMLDocument('').documentElement)).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect(inDOM(null)).to.be.false;
    expect(inDOM({})).to.be.false;
    expect(inDOM()).to.be.false;
  });
});
