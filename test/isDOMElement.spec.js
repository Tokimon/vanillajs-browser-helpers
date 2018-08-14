/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import { expect, testUtils, describe, it } from './assets/init-test';

import isDOMElement from '../isDOMElement';



describe('"isDOMElement"', () => {
  it('Should only return true for DOM elements', () => {
    // True statements
    expect(isDOMElement(document.documentElement)).to.be.true;
    expect(isDOMElement(document.body)).to.be.true;
    expect(isDOMElement(testUtils.create('p'))).to.be.true;

    // False statements
    expect(isDOMElement(document)).to.be.false;
    expect(isDOMElement(document.createDocumentFragment())).to.be.false;
    expect(isDOMElement(document.createTextNode(''))).to.be.false;
    expect(isDOMElement(document.createComment(''))).to.be.false;
    expect(isDOMElement(window)).to.be.false;
  });

  it('Should return true if DOM element matches one of the given html tag names', () => {
    expect(isDOMElement(document.documentElement, 'html')).to.be.true;
    expect(isDOMElement(document.documentElement, ['body', 'html'])).to.be.true;
    expect(isDOMElement(document.documentElement, 'body, html')).to.be.true;
    expect(isDOMElement(document.documentElement, 'body html')).to.be.true;
    expect(isDOMElement(document.documentElement, 'body')).to.be.false;
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMElement(null)).to.be.false;
    expect(isDOMElement({})).to.be.false;
    expect(isDOMElement({ nodeType: 1 })).to.be.false;
    expect(isDOMElement()).to.be.false;
  });
});
