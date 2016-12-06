var _removeClass = require('../removeClass');

var _removeClass2 = _interopRequireDefault(_removeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"removeClass"', () => {
  before(() => $.html(`<div id="${ testID }"></div>`));
  beforeEach(() => {
    $.id(testID).className = '';
  });

  after(() => $.remove(testID));

  it('Should remove a given CSS class from a DOM element', () => {
    const node = $.id(testID);
    node.className = 'removed';

    expect(node.className).to.equal('removed');
    (0, _removeClass2.default)(node, 'removed');
    expect(node.className).to.equal('');
  });

  it('Should always return given element', () => {
    const div = $.create('div');
    expect((0, _removeClass2.default)(null, 'inserted')).to.be.null;
    expect((0, _removeClass2.default)({}, 'inserted')).to.be.an('object');
    expect((0, _removeClass2.default)(div)).to.equal(div);
    expect((0, _removeClass2.default)(div, 'inserted')).to.equal(div);
  });

  describe('- class names as Array', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      (0, _removeClass2.default)(node, ['removed', 'erased', 'class3']);
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      (0, _removeClass2.default)(node, ['removed', 'class3']);
      expect(node.className).to.equal('not-removed');
    });
  });

  describe('- class names as space separated String', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      (0, _removeClass2.default)(node, 'removed erased class3');
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      (0, _removeClass2.default)(node, 'removed class3');
      expect(node.className).to.equal('not-removed');
    });
  });
});