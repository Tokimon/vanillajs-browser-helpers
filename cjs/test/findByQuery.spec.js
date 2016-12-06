var _findByQuery = require('../findByQuery');

var _findByQuery2 = _interopRequireDefault(_findByQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"findByQuery"', () => {
  before(() => $.html(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `));

  after(() => ['Item1', 'Item2'].forEach(id => $.remove(id)));

  describe('- find ALL', () => {
    it('Should always return an Array', () => {
      expect((0, _findByQuery2.default)()).to.be.an('array');
      expect((0, _findByQuery2.default)(null)).to.be.an('array');
      expect((0, _findByQuery2.default)('#Item2.item')).to.be.an('array');
    });

    it('Should find DOM elements from a given CSS selector', () => {
      let nodes = (0, _findByQuery2.default)('#Item2.item');
      expect(nodes).to.be.a('array').and.to.have.length(1);

      expect(nodes[0]).to.have.id('Item2');

      nodes = (0, _findByQuery2.default)('#Item2 .item');
      expect(nodes).to.be.a('array').and.to.have.length(2);

      expect(nodes[1]).to.have.class('second-child');

      nodes = (0, _findByQuery2.default)('.item');
      expect(nodes).to.be.a('array').and.to.have.length(4);

      expect(nodes[0]).to.have.id('Item1');
    });

    it('Should filter out non string values', () => {
      let nodes = (0, _findByQuery2.default)(99);
      expect(nodes).to.be.a('array').and.to.have.length(0);

      nodes = (0, _findByQuery2.default)();
      expect(nodes).to.be.a('array').and.to.have.length(0);
    });

    it('Should fail on bad queries', () => {
      expect(() => (0, _findByQuery2.default)(':badquery')).to.throw(Error, /bad query given/);
    });

    describe('- With multiple queries', () => {
      it('Should find a unique DOM element collection from a list of CSS seletors', () => {
        let nodes = (0, _findByQuery2.default)('.item, .item.child');
        expect(nodes).to.be.a('array').and.to.have.length(4);

        expect(nodes[3]).to.have.class('second-child');

        nodes = (0, _findByQuery2.default)(['.item', '.item.child']);
        expect(nodes).to.be.a('array').and.to.have.length(4);

        expect(nodes[3]).to.have.class('second-child');
      });

      it('Should filter out non string values', () => {
        const nodes = (0, _findByQuery2.default)([null, 123, '.item.child']);
        expect(nodes).to.be.a('array').and.to.have.length(2);

        expect(nodes[1]).to.have.class('second-child');
      });
    });

    describe('- With defined context', () => {
      it('Should find DOM elements matching given CSS selector from a given DOM element context', () => {
        const nodes = (0, _findByQuery2.default)(['.item.child', '.second-child'], $.id('Item2'));
        expect(nodes).to.be.a('array').and.to.have.length(2);

        expect(nodes[1]).to.have.class('second-child');
      });

      it('Should fallback to document on non DOM element values', () => {
        let nodes = (0, _findByQuery2.default)('.item', {});
        expect(nodes).to.be.a('array').and.to.have.length(4);

        nodes = (0, _findByQuery2.default)('.item', null);
        expect(nodes).to.be.a('array').and.to.have.length(4);
      });
    });
  });

  describe('- find FIRST', () => {
    it('Should find DOM elements from a given CSS selector', () => {
      let node = (0, _findByQuery2.default)('#Item2.item', true);
      expect(node).to.not.be.null;
      expect(node).to.have.id('Item2');

      node = (0, _findByQuery2.default)('#Item2 .item', true);
      expect(node).to.not.be.null;
      expect(node.className).to.equal('item child');

      node = (0, _findByQuery2.default)('.item', true);
      expect(node).to.not.be.null;
      expect(node).to.have.id('Item1');
    });

    it('Should filter out non string values', () => {
      let node = (0, _findByQuery2.default)(99, true);
      expect(node).to.be.null;

      node = (0, _findByQuery2.default)(undefined, true);
      expect(node).to.be.null;
    });

    it('Should fail on bad queries', () => {
      expect(() => (0, _findByQuery2.default)(':badquery', true)).to.throw(Error, /bad query given/);
    });

    describe('- With multiple queries', () => {
      it('Should find a unique DOM element collection from a list of CSS seletors', () => {
        let node = (0, _findByQuery2.default)('.item, .item.child', true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');

        node = (0, _findByQuery2.default)(['.item', '.item.child'], true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');
      });

      it('Should filter out non string values', () => {
        const node = (0, _findByQuery2.default)([null, 123, '.item.child'], true);
        expect(node).to.not.be.null;
        expect(node.className).to.equal('item child');
      });
    });

    describe('- With defined context', () => {
      it('Should find DOM elements matching given CSS selector from a given DOM element context', () => {
        const node = (0, _findByQuery2.default)(['.item.child', '.second-child'], $.id('Item2'), true);
        expect(node).to.not.be.null;
        expect(node.className).to.equal('item child');
      });

      it('Should fallback to document on non DOM element values', () => {
        let node = (0, _findByQuery2.default)('.item', {}, true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');

        node = (0, _findByQuery2.default)('.item', null, true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');
      });
    });
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $ */