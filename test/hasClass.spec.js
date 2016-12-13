/* eslint-env node, mocha, browser */
/* global expect, $ */

import '../polyfills/domtokenlist';

import hasClass, { hasAnyClass } from '../hasClass';

const testID = 'TestNode';

describe('"hasClass" package', () => {
  before(() => $.html(`<div id="${testID}" class="class1 class2"></div>`));
  after(() => $.remove(testID));

  describe('"hasClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      const node = $.id(testID);
      expect(hasClass(node, 'class1')).to.be.true;
      expect(hasClass(node, 'class3')).to.be.false;
    });

    it('Should return false if no DOM element or class name was given', () => {
      const node = $.id(testID);
      expect(hasClass(null, 'class1 class2')).to.be.false;
      expect(hasClass(node)).to.be.false;
      expect(hasClass()).to.be.false;
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element all of the given class names', () => {
        const node = $.id(testID);
        expect(hasClass(node, ['class1', 'class2'])).to.be.true;
        expect(hasClass(node, ['class1', 'class3'])).to.be.false;
        expect(hasClass(node, ['class3', 'class4'])).to.be.false;
      });

      it('Should detect if a DOM element any of the given class names (any = true)', () => {
        const node = $.id(testID);
        expect(hasClass(node, ['class1', 'class2'], true)).to.be.true;
        expect(hasClass(node, ['class1', 'class3'], true)).to.be.true;
        expect(hasClass(node, ['class3', 'class4'], true)).to.be.false;
      });
    });

    describe('- class names as space separated String', () => {
      it('Should detect if a DOM element all of the given class names', () => {
        const node = $.id(testID);
        expect(hasClass(node, 'class1 class2')).to.be.true;
        expect(hasClass(node, 'class1 class3')).to.be.false;
        expect(hasClass(node, 'class3 class4')).to.be.false;
      });

      it('Should detect if a DOM element any of the given class names (any = true)', () => {
        const node = $.id(testID);
        expect(hasClass(node, 'class1 class2', true)).to.be.true;
        expect(hasClass(node, 'class1 class3', true)).to.be.true;
        expect(hasClass(node, 'class3 class4', true)).to.be.false;
      });
    });
  });

  describe('"hasAnyClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      const node = $.id(testID);
      expect(hasAnyClass(node, 'class1')).to.be.true;
      expect(hasAnyClass(node, 'class3')).to.be.false;
    });

    it('Should return false if no DOM element or class name was given', () => {
      const node = $.id(testID);
      expect(hasAnyClass(null, 'class1 class2')).to.be.false;
      expect(hasAnyClass({}, 'class1 class2')).to.be.false;
      expect(hasAnyClass(node)).to.be.false;
      expect(hasAnyClass()).to.be.false;
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element any of the given class names', () => {
        const node = $.id(testID);
        expect(hasAnyClass(node, ['class1', 'class2'], true)).to.be.true;
        expect(hasAnyClass(node, ['class1', 'class3'], true)).to.be.true;
        expect(hasAnyClass(node, ['class3', 'class4'], true)).to.be.false;
      });
    });

    describe('- class names as space separated String', () => {
      it('Should detect if a DOM element any of the given class names', () => {
        const node = $.id(testID);
        expect(hasAnyClass(node, 'class1 class2', true)).to.be.true;
        expect(hasAnyClass(node, 'class1 class3', true)).to.be.true;
        expect(hasAnyClass(node, 'class3 class4', true)).to.be.false;
      });
    });
  });
});
