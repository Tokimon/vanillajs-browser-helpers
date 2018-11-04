import { expect, helpers, describe, it, before, after } from './assets/init-test';

import hasClass, { hasAnyClass } from '../hasClass';



const testID = 'TestNode';



describe('"hasClass" package', () => {
  before(() => helpers.html(`<div id="${testID}" class="class1 class2"></div>`));
  after(() => helpers.remove(testID));

  describe('"hasClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      const node = helpers.id(testID);
      expect(hasClass(node, 'class1')).to.equal(true);
      expect(hasClass(node, 'class3')).to.equal(false);
    });

    it('Should return false if no DOM element or class name was given', () => {
      const node = helpers.id(testID);
      expect(hasClass(null, 'class1 class2')).to.equal(false);
      expect(hasClass(node)).to.equal(false);
      expect(hasClass()).to.equal(false);
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element all of the given class names', () => {
        const node = helpers.id(testID);
        expect(hasClass(node, ['class1', 'class2'])).to.equal(true);
        expect(hasClass(node, ['class1', 'class3'])).to.equal(false);
        expect(hasClass(node, ['class3', 'class4'])).to.equal(false);
      });

      it('Should detect if a DOM element any of the given class names (any = true)', () => {
        const node = helpers.id(testID);
        expect(hasClass(node, ['class1', 'class2'], true)).to.equal(true);
        expect(hasClass(node, ['class1', 'class3'], true)).to.equal(true);
        expect(hasClass(node, ['class3', 'class4'], true)).to.equal(false);
      });
    });

    describe('- class names as space separated String', () => {
      it('Should detect if a DOM element all of the given class names', () => {
        const node = helpers.id(testID);
        expect(hasClass(node, 'class1 class2')).to.equal(true);
        expect(hasClass(node, 'class1 class3')).to.equal(false);
        expect(hasClass(node, 'class3 class4')).to.equal(false);
      });

      it('Should detect if a DOM element any of the given class names (any = true)', () => {
        const node = helpers.id(testID);
        expect(hasClass(node, 'class1 class2', true)).to.equal(true);
        expect(hasClass(node, 'class1 class3', true)).to.equal(true);
        expect(hasClass(node, 'class3 class4', true)).to.equal(false);
      });
    });
  });

  describe('"hasAnyClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      const node = helpers.id(testID);
      expect(hasAnyClass(node, 'class1')).to.equal(true);
      expect(hasAnyClass(node, 'class3')).to.equal(false);
    });

    it('Should return false if no DOM element or class name was given', () => {
      const node = helpers.id(testID);
      expect(hasAnyClass(null, 'class1 class2')).to.equal(false);
      expect(hasAnyClass({}, 'class1 class2')).to.equal(false);
      expect(hasAnyClass(node)).to.equal(false);
      expect(hasAnyClass()).to.equal(false);
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element any of the given class names', () => {
        const node = helpers.id(testID);
        expect(hasAnyClass(node, ['class1', 'class2'], true)).to.equal(true);
        expect(hasAnyClass(node, ['class1', 'class3'], true)).to.equal(true);
        expect(hasAnyClass(node, ['class3', 'class4'], true)).to.equal(false);
      });
    });

    describe('- class names as space separated String', () => {
      it('Should detect if a DOM element any of the given class names', () => {
        const node = helpers.id(testID);
        expect(hasAnyClass(node, 'class1 class2', true)).to.equal(true);
        expect(hasAnyClass(node, 'class1 class3', true)).to.equal(true);
        expect(hasAnyClass(node, 'class3 class4', true)).to.equal(false);
      });
    });
  });
});
