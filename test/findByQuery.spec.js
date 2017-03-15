/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $ */
import 'polyfills/array-from-polyfill';
import findByQuery from '../findByQuery';

describe('"findByQuery"', () => {
  before(() => $.html(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `));

  after(() => ['Item1', 'Item2'].forEach((id) => $.remove(id)));

  describe('- find ALL', () => {
    it('Should always return an Array', () => {
      expect(findByQuery()).to.be.an('array');
      expect(findByQuery(null)).to.be.an('array');
      expect(findByQuery('#Item2.item')).to.be.an('array');
    });

    it('Should find DOM elements from a given CSS selector', () => {
      let nodes = findByQuery('#Item2.item');
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(1);

      expect(nodes[0]).to.have.id('Item2');

      nodes = findByQuery('#Item2 .item');
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(2);

      expect(nodes[1]).to.have.class('second-child');

      nodes = findByQuery('.item');
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(4);

      expect(nodes[0]).to.have.id('Item1');
    });

    it('Should filter out non string values', () => {
      let nodes = findByQuery(99);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(0);

      nodes = findByQuery();
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(0);
    });

    it('Should fail on bad queries', () => {
      expect(() => findByQuery(':badquery')).to.throw(Error, /bad query given/);
    });

    describe('- With multiple queries', () => {
      it('Should find a unique DOM element collection from a list of CSS seletors', () => {
        let nodes = findByQuery('.item, .item.child');
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(4);

        expect(nodes[3]).to.have.class('second-child');

        nodes = findByQuery(['.item', '.item.child']);
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(4);

        expect(nodes[3]).to.have.class('second-child');
      });

      it('Should filter out non string values', () => {
        const nodes = findByQuery([null, 123, '.item.child']);
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(2);

        expect(nodes[1]).to.have.class('second-child');
      });
    });

    describe('- With defined context', () => {
      it('Should find DOM elements matching given CSS selector from a given DOM element context', () => {
        const nodes = findByQuery(['.item.child', '.second-child'], $.id('Item2'));
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(2);

        expect(nodes[1]).to.have.class('second-child');
      });

      it('Should fallback to document on non DOM element values', () => {
        let nodes = findByQuery('.item', {});
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(4);

        nodes = findByQuery('.item', null);
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(4);
      });
    });
  });

  describe('- find FIRST', () => {
    it('Should find DOM elements from a given CSS selector', () => {
      let node = findByQuery('#Item2.item', true);
      expect(node).to.not.be.null;
      expect(node).to.have.id('Item2');

      node = findByQuery('#Item2 .item', true);
      expect(node).to.not.be.null;
      expect(node.className).to.equal('item child');

      node = findByQuery('.item', true);
      expect(node).to.not.be.null;
      expect(node).to.have.id('Item1');
    });

    it('Should filter out non string values', () => {
      let node = findByQuery(99, true);
      expect(node).to.be.null;

      node = findByQuery(undefined, true);
      expect(node).to.be.null;
    });

    it('Should fail on bad queries', () => {
      expect(() => findByQuery(':badquery', true)).to.throw(Error, /bad query given/);
    });

    describe('- With multiple queries', () => {
      it('Should find a unique DOM element collection from a list of CSS seletors', () => {
        let node = findByQuery('.item, .item.child', true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');

        node = findByQuery(['.item', '.item.child'], true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');
      });

      it('Should filter out non string values', () => {
        const node = findByQuery([null, 123, '.item.child'], true);
        expect(node).to.not.be.null;
        expect(node.className).to.equal('item child');
      });
    });

    describe('- With defined context', () => {
      it('Should find DOM elements matching given CSS selector from a given DOM element context', () => {
        const node = findByQuery(['.item.child', '.second-child'], $.id('Item2'), true);
        expect(node).to.not.be.null;
        expect(node.className).to.equal('item child');
      });

      it('Should fallback to document on non DOM element values', () => {
        let node = findByQuery('.item', {}, true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');

        node = findByQuery('.item', null, true);
        expect(node).to.not.be.null;
        expect(node).to.have.id('Item1');
      });
    });
  });
});
