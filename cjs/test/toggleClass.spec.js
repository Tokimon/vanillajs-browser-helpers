var _toggleClass = require('../toggleClass');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"toggleClass"', () => {
  before(() => document.body.insertAdjacentHTML('beforeend', `<div id="${ testID }"></div>`));
  beforeEach(() => {
    $.id(testID).className = '';
  });

  after(() => $.remove(testID));

  it('Should toggle a given class name on a DOM element', () => {
    const node = $.id(testID);
    node.className = '';

    expect(node.className).to.equal('');
    (0, _toggleClass2.default)(node, 'removed');
    expect(node.className).to.equal('removed');
    (0, _toggleClass2.default)(node, 'removed');
    expect(node.className).to.equal('');
  });

  it('Should add a given class name to a DOM element if `force` is true', () => {
    const node = $.id(testID);

    expect(node.className).to.equal('');
    (0, _toggleClass2.default)(node, 'added', true);
    expect(node.className).to.equal('added');
    (0, _toggleClass2.default)(node, 'added', true);
    expect(node.className).to.equal('added');
  });

  it('Should remove a given class name from a DOM element if `force` is false', () => {
    const node = $.id(testID);
    node.className = 'removed';

    expect(node.className).to.equal('removed');
    (0, _toggleClass2.default)(node, 'removed', false);
    expect(node.className).to.equal('');
    (0, _toggleClass2.default)(node, 'removed', false);
    expect(node.className).to.equal('');
  });

  it('Should always return given element', () => {
    const div = $.create('div');
    expect((0, _toggleClass2.default)(null, 'inserted')).to.be.null;
    expect((0, _toggleClass2.default)({}, 'inserted')).to.be.an('object');
    expect((0, _toggleClass2.default)(div)).to.equal(div);
    expect((0, _toggleClass2.default)(div, 'inserted')).to.equal(div);
  });

  describe('- class names as Array', () => {
    it('Should toggle given class names on a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed';

      expect(node.className).to.equal('removed');
      (0, _toggleClass2.default)(node, ['removed', 'added', 'class3']);
      expect(node.className).to.equal('added class3');
      (0, _toggleClass2.default)(node, ['removed', 'class3']);
      expect(node.className).to.equal('added removed');
    });

    it('Should add a given class names to a DOM element if `force` is true', () => {
      const node = $.id(testID);

      expect(node.className).to.equal('');
      (0, _toggleClass2.default)(node, ['added', 'class3'], true);
      expect(node.className).to.equal('added class3');
      (0, _toggleClass2.default)(node, ['added', 'class3'], true);
      expect(node.className).to.equal('added class3');
    });

    it('Should remove a given class names from a DOM element if `force` is false', () => {
      const node = $.id(testID);
      node.className = 'removed class3';

      expect(node.className).to.equal('removed class3');
      (0, _toggleClass2.default)(node, ['removed', 'class3'], false);
      expect(node.className).to.equal('');
      (0, _toggleClass2.default)(node, ['removed', 'class3'], false);
      expect(node.className).to.equal('');
    });
  });

  describe('- class names as space separated String', () => {
    it('Should toggle given class names on a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed';

      expect(node.className).to.equal('removed');
      (0, _toggleClass2.default)(node, 'removed added class3');
      expect(node.className).to.equal('added class3');
      (0, _toggleClass2.default)(node, 'removed class3');
      expect(node.className).to.equal('added removed');
    });

    it('Should add a given class names to a DOM element if `force` is true', () => {
      const node = $.id(testID);

      expect(node.className).to.equal('');
      (0, _toggleClass2.default)(node, 'added class3', true);
      expect(node.className).to.equal('added class3');
      (0, _toggleClass2.default)(node, 'added class3', true);
      expect(node.className).to.equal('added class3');
    });

    it('Should remove a given class names from a DOM element if `force` is false', () => {
      const node = $.id(testID);
      node.className = 'removed class3';

      expect(node.className).to.equal('removed class3');
      (0, _toggleClass2.default)(node, 'removed class3', false);
      expect(node.className).to.equal('');
      (0, _toggleClass2.default)(node, 'removed class3', false);
      expect(node.className).to.equal('');
    });
  });
});