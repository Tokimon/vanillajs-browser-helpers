import { expect, helpers, describe, it, before, after } from './assets/init-test';

import hasClass, { hasAnyClass } from '../hasClass';



const testID = 'TestNode';



describe('"hasClass" package', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => { testNode.className = 'class1 class2'; });

  after(() => helpers.remove(testID));

  describe('"hasClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      expect(hasClass(testNode, 'class1')).to.equal(true);
      expect(hasClass(testNode, 'class3')).to.equal(false);
    });

    it('Should return false if no DOM element was given', () => {
      expect(hasClass(null, 'class')).to.equal(false);
      expect(hasClass(undefined, 'class')).to.equal(false);
      expect(hasClass({ className: 'class' }, 'class')).to.equal(false);
      expect(hasClass([], 'class')).to.equal(false);
    });

    it('Should return false if no class name was given', () => {
      expect(hasClass(testNode)).to.equal(false);
      expect(hasClass()).to.equal(false);
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element all of the given class names', () => {
        expect(hasClass(testNode, ['class1', 'class2'])).to.equal(true);
        expect(hasClass(testNode, ['class1', 'class3'])).to.equal(false);
        expect(hasClass(testNode, ['class3', 'class4'])).to.equal(false);
      });

      it('Should detect if a DOM element any of the given class names (any = true)', () => {
        expect(hasClass(testNode, ['class1', 'class2'], true)).to.equal(true);
        expect(hasClass(testNode, ['class1', 'class3'], true)).to.equal(true);
        expect(hasClass(testNode, ['class3', 'class4'], true)).to.equal(false);
      });
    });
  });

  describe('"hasAnyClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      expect(hasAnyClass(testNode, 'class1')).to.equal(true);
      expect(hasAnyClass(testNode, 'class3')).to.equal(false);
    });

    it('Should return false if no DOM element was given', () => {
      expect(hasClass(null, 'class')).to.equal(false);
      expect(hasClass(undefined, 'class')).to.equal(false);
      expect(hasClass({ className: 'class' }, 'class')).to.equal(false);
      expect(hasClass([], 'class')).to.equal(false);
    });

    it('Should return false if no class name was given', () => {
      expect(hasClass(testNode)).to.equal(false);
      expect(hasClass()).to.equal(false);
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element any of the given class names', () => {
        expect(hasAnyClass(testNode, ['class1', 'class2'], true)).to.equal(true);
        expect(hasAnyClass(testNode, ['class1', 'class3'], true)).to.equal(true);
        expect(hasAnyClass(testNode, ['class3', 'class4'], true)).to.equal(false);
      });
    });
  });
});
