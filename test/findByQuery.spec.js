import { expect, helpers, describe, it, before, after } from './assets/init-test';

import findByQuery from '../findByQuery';



describe('"findByQuery"', () => {
  before(() => helpers.html(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `));

  after(() => ['Item1', 'Item2'].forEach((id) => helpers.remove(id)));

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
      expect(() => findByQuery(':badquery')).to.throw(Error);
    });

    describe('- With multiple queries', () => {
      it('Should find a unique DOM element collection from a list of CSS seletors', () => {
        const nodes = findByQuery(['.item', '.item.child']);
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(4);

        expect(nodes[3]).to.have.class('second-child');
      });
    });

    describe('- With defined elm', () => {
      it('Should find DOM elements starting from the given elm', () => {
        const nodes = findByQuery(helpers.id('Item2'), ['.item.child', '.second-child']);
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(2);

        expect(nodes[1]).to.have.class('second-child');
      });

      it('Should return empty array if selector is not given', () => {
        const nodes = findByQuery(helpers.id('Item2'));
        expect(nodes)
          .to.be.a('array')
          .and.to.have.length(0);
      });
    });
  });

  describe('- find FIRST', () => {
    it('Should find DOM elements from a given CSS selector', () => {
      let node = findByQuery('#Item2.item', true);
      expect(node).to.not.equal(null);
      expect(node).to.have.id('Item2');

      node = findByQuery('#Item2 .item', true);
      expect(node).to.not.equal(null);
      expect(node.className).to.equal('item child');

      node = findByQuery('.item', true);
      expect(node).to.not.equal(null);
      expect(node).to.have.id('Item1');
    });

    it('Should fail on bad queries', () => {
      expect(() => findByQuery(':badquery', true)).to.throw(Error);
    });

    describe('- With multiple queries', () => {
      it('Should find a unique DOM element collection from a list of CSS seletors', () => {
        let node = findByQuery('.item, .item.child', true);
        expect(node).to.not.equal(null);
        expect(node).to.have.id('Item1');

        node = findByQuery(['.item', '.item.child'], true);
        expect(node).to.not.equal(null);
        expect(node).to.have.id('Item1');
      });
    });

    describe('- With defined elm', () => {
      it('Should find DOM elements starting from the given elm', () => {
        const node = findByQuery(['.item.child', '.second-child'], helpers.id('Item2'), true);
        expect(node).to.not.equal(null);
        expect(node.className).to.equal('item child');
      });

      it('Should return null if selector is not given', () => {
        const node = findByQuery(helpers.id('Item2'), 99, true);
        expect(node).to.equal(null);
      });
    });
  });
});
