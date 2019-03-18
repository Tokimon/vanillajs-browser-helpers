import { expect, helpers, describe, it, before, after } from './assets/init-test';

import siblings, { prev, next } from '../siblings';



const testID = 'SiblingsTestNode';



describe('"siblings package"', () => {
  before(() => helpers.html(
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

  after(() => helpers.remove(testID));

  describe('"siblings"', () => {
    it('Should return empty array on non child element values and only childs', () => {
      expect(siblings(null)).to.be.an('array').and.to.have.length(0);
      expect(siblings([])).to.be.an('array').and.to.have.length(0);
      expect(siblings({})).to.be.an('array').and.to.have.length(0);
      expect(siblings(helpers.id('NoChild').firstChild)).to.be.an('array').and.to.have.length(0);
      expect(siblings(helpers.id('LoneChild'))).to.be.an('array').and.to.have.length(0);
    });

    it('Should return an array of siblings of the element', () => {
      expect(siblings(helpers.id(testID).firstChild)).to.be.an('array').and.to.have.length(4);
    });
  });

  describe('"prev"', () => {
    it('Should return null for non child element values and only childs', () => {
      expect(prev(null)).to.equal(null);
      expect(prev([])).to.equal(null);
      expect(prev({})).to.equal(null);
      expect(prev(helpers.id('NoChild').firstChild)).to.equal(null);
      expect(prev(helpers.id('LoneChild'))).to.equal(null);
    });

    it('Should return the previous element sibling', () => {
      const first = helpers.id('FirstChild');
      const last = helpers.id('LastChild');
      expect(prev(last)).to.not.equal(null);
      expect(prev(last).nodeType).to.be.equal(1);
      expect(prev(first)).to.equal(null);
    });
  });

  describe('"next"', () => {
    it('Should return null for non child element values and only childs', () => {
      expect(next(null)).to.equal(null);
      expect(next([])).to.equal(null);
      expect(next({})).to.equal(null);
      expect(next(helpers.id('NoChild').firstChild)).to.equal(null);
      expect(next(helpers.id('LoneChild'))).to.equal(null);
    });

    it('Should return the next element sibling', () => {
      const first = helpers.id('FirstChild');
      const last = helpers.id('LastChild');
      expect(next(first)).to.not.equal(null);
      expect(next(first).nodeType).to.be.equal(1);
      expect(next(last)).to.equal(null);
    });
  });
});
