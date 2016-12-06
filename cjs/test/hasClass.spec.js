var _hasClass = require('../hasClass');

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"hasClass" package', () => {
  before(() => $.html(`<div id="${ testID }" class="class1 class2"></div>`));
  after(() => $.remove(testID));

  describe('"hasClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      const node = $.id(testID);
      expect((0, _hasClass2.default)(node, 'class1')).to.be.true;
      expect((0, _hasClass2.default)(node, 'class3')).to.be.false;
    });

    it('Should return false if no DOM element or class name was given', () => {
      const node = $.id(testID);
      expect((0, _hasClass2.default)(null, 'class1 class2')).to.be.false;
      expect((0, _hasClass2.default)(node)).to.be.false;
      expect((0, _hasClass2.default)()).to.be.false;
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element all of the given class names', () => {
        const node = $.id(testID);
        expect((0, _hasClass2.default)(node, ['class1', 'class2'])).to.be.true;
        expect((0, _hasClass2.default)(node, ['class1', 'class3'])).to.be.false;
        expect((0, _hasClass2.default)(node, ['class3', 'class4'])).to.be.false;
      });

      it('Should detect if a DOM element any of the given class names (any = true)', () => {
        const node = $.id(testID);
        expect((0, _hasClass2.default)(node, ['class1', 'class2'], true)).to.be.true;
        expect((0, _hasClass2.default)(node, ['class1', 'class3'], true)).to.be.true;
        expect((0, _hasClass2.default)(node, ['class3', 'class4'], true)).to.be.false;
      });
    });

    describe('- class names as space separated String', () => {
      it('Should detect if a DOM element all of the given class names', () => {
        const node = $.id(testID);
        expect((0, _hasClass2.default)(node, 'class1 class2')).to.be.true;
        expect((0, _hasClass2.default)(node, 'class1 class3')).to.be.false;
        expect((0, _hasClass2.default)(node, 'class3 class4')).to.be.false;
      });

      it('Should detect if a DOM element any of the given class names (any = true)', () => {
        const node = $.id(testID);
        expect((0, _hasClass2.default)(node, 'class1 class2', true)).to.be.true;
        expect((0, _hasClass2.default)(node, 'class1 class3', true)).to.be.true;
        expect((0, _hasClass2.default)(node, 'class3 class4', true)).to.be.false;
      });
    });
  });

  describe('"hasAnyClass"', () => {
    it('Should detect if a DOM element has a given class name', () => {
      const node = $.id(testID);
      expect((0, _hasClass.hasAnyClass)(node, 'class1')).to.be.true;
      expect((0, _hasClass.hasAnyClass)(node, 'class3')).to.be.false;
    });

    it('Should return false if no DOM element or class name was given', () => {
      const node = $.id(testID);
      expect((0, _hasClass.hasAnyClass)(null, 'class1 class2')).to.be.false;
      expect((0, _hasClass.hasAnyClass)({}, 'class1 class2')).to.be.false;
      expect((0, _hasClass.hasAnyClass)(node)).to.be.false;
      expect((0, _hasClass.hasAnyClass)()).to.be.false;
    });

    describe('- class names as Array', () => {
      it('Should detect if a DOM element any of the given class names', () => {
        const node = $.id(testID);
        expect((0, _hasClass.hasAnyClass)(node, ['class1', 'class2'], true)).to.be.true;
        expect((0, _hasClass.hasAnyClass)(node, ['class1', 'class3'], true)).to.be.true;
        expect((0, _hasClass.hasAnyClass)(node, ['class3', 'class4'], true)).to.be.false;
      });
    });

    describe('- class names as space separated String', () => {
      it('Should detect if a DOM element any of the given class names', () => {
        const node = $.id(testID);
        expect((0, _hasClass.hasAnyClass)(node, 'class1 class2', true)).to.be.true;
        expect((0, _hasClass.hasAnyClass)(node, 'class1 class3', true)).to.be.true;
        expect((0, _hasClass.hasAnyClass)(node, 'class3 class4', true)).to.be.false;
      });
    });
  });
});