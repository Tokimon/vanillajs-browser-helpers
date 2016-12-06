var _addClass = require('../addClass');

var _addClass2 = _interopRequireDefault(_addClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"addClass"', () => {
  before(() => $.html(`<div id="${ testID }"></div>`));
  beforeEach(() => {
    $.id(testID).className = '';
  });

  after(() => $.remove(testID));

  it('Should add a given CSS class to a DOM element', () => {
    const node = $.id(testID);

    expect(node.className).to.equal('');
    (0, _addClass2.default)(node, 'inserted');
    expect(node.className).to.equal('inserted');
  });

  it('Should not add a given CSS class twice to a DOM element', () => {
    const node = $.id(testID);
    node.className = 'inserted';

    expect(node.className).to.equal('inserted');
    (0, _addClass2.default)(node, 'inserted');
    expect(node.className).to.equal('inserted');
  });

  it('Should always return the given element', () => {
    const node = $.id(testID);

    expect((0, _addClass2.default)(null, 'always')).to.be.null;
    expect((0, _addClass2.default)(node, 'always')).to.equal(node);

    expect((0, _addClass2.default)(null)).to.be.null;
    expect((0, _addClass2.default)(node)).to.equal(node);
  });

  describe('- Multiple class names', () => {
    it('Should add several CSS classes to a DOM element', () => {
      const node = $.id(testID);

      expect(node.className).to.equal('');
      (0, _addClass2.default)(node, 'inserted added class3');
      expect(node.className).to.equal('inserted added class3');

      node.className = '';

      (0, _addClass2.default)(node, 'inserted, added, class3');
      expect(node.className).to.equal('inserted added class3');

      node.className = '';

      (0, _addClass2.default)(node, ['inserted', 'added', 'class3']);
      expect(node.className).to.equal('inserted added class3');
    });

    it('Should only add unset CSS classes to a DOM element', () => {
      const node = $.id(testID);
      node.className = 'inserted class3';

      expect(node.className).to.equal('inserted class3');
      (0, _addClass2.default)(node, 'inserted added class3');
      expect(node.className).to.equal('inserted class3 added');
    });
  });
});