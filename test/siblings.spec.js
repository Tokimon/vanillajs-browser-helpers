/* eslint-env node, mocha, browser */
/* global expect, $ */
import siblings, { prev, next } from '../siblings';

const testID = 'SiblingsTestNode';

describe('"siblings package"', () => {
  before(() => $.html(
`<div id="${testID}">
  <span id="FirstChild">
    <b id="LoneChild"></b>
  </span>
  text
  <br>
  <span id="NoChild"></span>
  <span id="LastChild"></span>
</div>`
  ));

  after(() => $.remove(testID));

  describe('"siblings"', () => {
    it('Should return empty array on non child element values and only childs', () => {
      expect(siblings(null)).to.be.an('array').and.to.have.length(0);
      expect(siblings([])).to.be.an('array').and.to.have.length(0);
      expect(siblings({})).to.be.an('array').and.to.have.length(0);
      expect(siblings($.id('NoChild').firstChild)).to.be.an('array').and.to.have.length(0);
      expect(siblings($.id('LoneChild'))).to.be.an('array').and.to.have.length(0);
    });

    it('Should return an array of siblings of the element', () => {
      expect(siblings($.id(testID).firstChild)).to.be.an('array').and.to.have.length(4);
    });
  });

  describe('"prev"', () => {
    it('Should return null for non child element values and only childs', () => {
      expect(prev(null)).to.be.null;
      expect(prev([])).to.be.null;
      expect(prev({})).to.be.null;
      expect(prev($.id('NoChild').firstChild)).to.be.null;
      expect(prev($.id('LoneChild'))).to.be.null;
    });

    it('Should return the previous element sibling', () => {
      const first = $.id('FirstChild');
      const last = $.id('LastChild');
      expect(prev(last)).to.not.be.null;
      expect(prev(last).nodeType).to.be.equal(1);
      expect(prev(first)).to.be.null;
    });
  });

  describe('"next"', () => {
    it('Should return null for non child element values and only childs', () => {
      expect(next(null)).to.be.null;
      expect(next([])).to.be.null;
      expect(next({})).to.be.null;
      expect(next($.id('NoChild').firstChild)).to.be.null;
      expect(next($.id('LoneChild'))).to.be.null;
    });

    it('Should return the next element sibling', () => {
      const first = $.id('FirstChild');
      const last = $.id('LastChild');
      expect(next(first)).to.not.be.null;
      expect(next(first).nodeType).to.be.equal(1);
      expect(next(last)).to.be.null;
    });
  });
});
