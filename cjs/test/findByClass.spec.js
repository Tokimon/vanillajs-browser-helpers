var _findByClass = require('../findByClass');

var _findByClass2 = _interopRequireDefault(_findByClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"findByClass"', () => {
  before(() => $.html(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `));

  after(() => ['Item1', 'Item2'].forEach(id => $.remove(id)));

  it('Should always return an Array', () => {
    expect((0, _findByClass2.default)()).to.be.an('array');
    expect((0, _findByClass2.default)(null)).to.be.an('array');
    expect((0, _findByClass2.default)('item')).to.be.an('array');
  });

  it('Should find DOM elements with a given classname', () => {
    const nodes = (0, _findByClass2.default)('item');
    expect(nodes).to.be.a('array').and.to.have.length(4);

    expect(nodes[1]).to.have.id('Item2');
  });

  it('Should find DOM elements with all given classnames', () => {
    const nodes = (0, _findByClass2.default)('item child');
    expect(nodes).to.be.a('array').and.to.have.length(2);

    expect(nodes[1]).to.have.class('second-child');
  });

  it('Should filter out bad values', () => {
    let nodes = (0, _findByClass2.default)(99);
    expect(nodes).to.be.a('array').and.to.have.length(0);

    nodes = (0, _findByClass2.default)();
    expect(nodes).to.be.a('array').and.to.have.length(0);
  });

  describe('- With multiple queries', () => {
    it('Should find a unique DOM element collection from a list of classnames', () => {
      let nodes = (0, _findByClass2.default)('item, item child');
      expect(nodes).to.be.a('array').and.to.have.length(4);

      expect(nodes[3]).to.have.class('second-child');

      nodes = (0, _findByClass2.default)(['item', 'item child']);
      expect(nodes).to.be.a('array').and.to.have.length(4);

      expect(nodes[3]).to.have.class('second-child');
    });

    it('Should filter out bad values', () => {
      const nodes = (0, _findByClass2.default)([null, 123, undefined, {}, 'item child', ':bad-class-name']);
      expect(nodes).to.be.a('array').and.to.have.length(2);

      expect(nodes[1]).to.have.class('second-child');
    });
  });

  describe('- With defined context', () => {
    it('Should find DOM elements matching given classnames from a given DOM element context', () => {
      const nodes = (0, _findByClass2.default)(['item child', 'second-child'], $.id('Item2'));
      expect(nodes).to.be.a('array').and.to.have.length(2);

      expect(nodes[1]).to.have.class('second-child');
    });

    it('Should fallback to document on non DOM element values', () => {
      let nodes = (0, _findByClass2.default)('item', {});
      expect(nodes).to.be.a('array').and.to.have.length(4);

      nodes = (0, _findByClass2.default)('item', null);
      expect(nodes).to.be.a('array').and.to.have.length(4);
    });
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */