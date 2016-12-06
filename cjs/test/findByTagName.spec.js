var _findByTagName = require('../findByTagName');

var _findByTagName2 = _interopRequireDefault(_findByTagName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'tagNameTest'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"findByTagName"', () => {
  before(() => $.html(`
    <div id="${ testID }">
      <div></div>
      <div></div>
      <div></div>
      <span></span>
    </div>
  `));

  after(() => $.remove(testID));

  it('Should always return an Array', () => {
    expect((0, _findByTagName2.default)()).to.be.an('array');
    expect((0, _findByTagName2.default)(null)).to.be.an('array');
    expect((0, _findByTagName2.default)('div')).to.be.an('array');
  });

  it('Should find DOM elements with a given tag name', () => {
    const nodes = (0, _findByTagName2.default)('div');
    expect(nodes).to.be.a('array').and.to.have.length(4);

    expect(nodes.every(node => node.nodeName === 'DIV')).to.be.true;
  });

  it('Should filter out bad values', () => {
    let nodes = (0, _findByTagName2.default)(99);
    expect(nodes).to.be.a('array').and.to.have.length(0);

    nodes = (0, _findByTagName2.default)();
    expect(nodes).to.be.a('array').and.to.have.length(0);
  });

  describe('- With multiple queries', () => {
    it('Should find a unique DOM element collection from a list of tag names', () => {
      let nodes = (0, _findByTagName2.default)('div, span');
      expect(nodes).to.be.a('array').and.to.have.length(5);

      expect(nodes[4].nodeName).to.equal('SPAN');

      nodes = (0, _findByTagName2.default)(['div', 'span']);
      expect(nodes).to.be.a('array').and.to.have.length(5);

      expect(nodes[4].nodeName).to.equal('SPAN');
    });

    it('Should filter out bad values', () => {
      const nodes = (0, _findByTagName2.default)([null, 123, undefined, {}, 'div', ':bad-tag-name']);
      expect(nodes).to.be.a('array').and.to.have.length(4);

      expect(nodes.every(node => node.nodeName === 'DIV')).to.be.true;
    });
  });

  describe('- With defined context', () => {
    it('Should find DOM elements matching given tag name from a given DOM element context', () => {
      const nodes = (0, _findByTagName2.default)('div', $.id(testID));
      expect(nodes).to.be.a('array').and.to.have.length(3);

      expect(nodes.every(node => node.nodeName === 'DIV')).to.be.true;
    });

    it('Should fallback to document on non DOM element values', () => {
      let nodes = (0, _findByTagName2.default)('div', {});
      expect(nodes).to.be.a('array').and.to.have.length(4);

      expect(nodes.every(node => node.nodeName === 'DIV')).to.be.true;

      nodes = (0, _findByTagName2.default)('div', null);
      expect(nodes).to.be.a('array').and.to.have.length(4);

      expect(nodes.every(node => node.nodeName === 'DIV')).to.be.true;
    });
  });
});