var _siblings = require('../siblings');

var _siblings2 = _interopRequireDefault(_siblings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'SiblingsTestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */


describe('"siblings package"', () => {
  before(() => $.html(`<div id="${ testID }">
  <span id="FirstChild">
    <b id="LoneChild"></b>
  </span>
  text
  <br>
  <span id="NoChild"></span>
  <span id="LastChild"></span>
</div>`));

  after(() => $.remove(testID));

  describe('"siblings"', () => {
    it('Should return empty array on non child element values and only childs', () => {
      expect((0, _siblings2.default)(null)).to.be.an('array').and.to.have.length(0);
      expect((0, _siblings2.default)([])).to.be.an('array').and.to.have.length(0);
      expect((0, _siblings2.default)({})).to.be.an('array').and.to.have.length(0);
      expect((0, _siblings2.default)($.id('NoChild').firstChild)).to.be.an('array').and.to.have.length(0);
      expect((0, _siblings2.default)($.id('LoneChild'))).to.be.an('array').and.to.have.length(0);
    });

    it('Should return an array of siblings of the element', () => {
      expect((0, _siblings2.default)($.id(testID).firstChild)).to.be.an('array').and.to.have.length(4);
    });
  });

  describe('"prev"', () => {
    it('Should return null for non child element values and only childs', () => {
      expect((0, _siblings.prev)(null)).to.be.null;
      expect((0, _siblings.prev)([])).to.be.null;
      expect((0, _siblings.prev)({})).to.be.null;
      expect((0, _siblings.prev)($.id('NoChild').firstChild)).to.be.null;
      expect((0, _siblings.prev)($.id('LoneChild'))).to.be.null;
    });

    it('Should return the previous element sibling', () => {
      const first = $.id('FirstChild');
      const last = $.id('LastChild');
      expect((0, _siblings.prev)(last)).to.not.be.null;
      expect((0, _siblings.prev)(last).nodeType).to.be.equal(1);
      expect((0, _siblings.prev)(first)).to.be.null;
    });
  });

  describe('"next"', () => {
    it('Should return null for non child element values and only childs', () => {
      expect((0, _siblings.next)(null)).to.be.null;
      expect((0, _siblings.next)([])).to.be.null;
      expect((0, _siblings.next)({})).to.be.null;
      expect((0, _siblings.next)($.id('NoChild').firstChild)).to.be.null;
      expect((0, _siblings.next)($.id('LoneChild'))).to.be.null;
    });

    it('Should return the next element sibling', () => {
      const first = $.id('FirstChild');
      const last = $.id('LastChild');
      expect((0, _siblings.next)(first)).to.not.be.null;
      expect((0, _siblings.next)(first).nodeType).to.be.equal(1);
      expect((0, _siblings.next)(last)).to.be.null;
    });
  });
});