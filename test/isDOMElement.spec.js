import { expect, helpers, describe, it } from './assets/init-test';

import isDOMElement from '../isDOMElement';



describe('"isDOMElement"', () => {
  it('Should only return true for DOM elements', () => {
    expect(isDOMElement(document.body)).to.equal(true);
    expect(isDOMElement(document.documentElement)).to.equal(true);
    expect(isDOMElement(helpers.create('p'))).to.equal(true);
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMElement(document)).to.equal(false);
    expect(isDOMElement(document.createDocumentFragment())).to.equal(false);
    expect(isDOMElement(document.createTextNode(''))).to.equal(false);
    expect(isDOMElement(document.createComment(''))).to.equal(false);
    expect(isDOMElement(window)).to.equal(false);
  });

  it('Should return true if DOM element matches one of the given tag names', () => {
    expect(isDOMElement(document.documentElement, 'html')).to.equal(true);
    expect(isDOMElement(document.body, 'body')).to.equal(true);
    expect(isDOMElement(document.createElement('p'), 'p')).to.equal(true);
    expect(isDOMElement(document.documentElement, ['body', 'html'])).to.equal(true);
  });

  it('Should return false if DOM element does not match one of the given tag names', () => {
    expect(isDOMElement(document.body, 'html')).to.equal(false);
    expect(isDOMElement(document.documentElement, 'body')).to.equal(false);
    expect(isDOMElement(document.createElement('p'), 'div')).to.equal(false);
    expect(isDOMElement(document.documentElement, ['body', 'div', 'p'])).to.equal(false);
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMElement()).to.equal(false);
    expect(isDOMElement(null)).to.equal(false);
    expect(isDOMElement({})).to.equal(false);
    expect(isDOMElement({ nodeType: 1 })).to.equal(false);
  });
});
