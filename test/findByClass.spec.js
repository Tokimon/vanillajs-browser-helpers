import { expect, helpers, describe, it, before, after } from './assets/init-test';

import findByClass from '../findByClass';



describe('"findByClass"', () => {
  before(() => helpers.html(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `));

  after(() => ['Item1', 'Item2'].forEach((id) => helpers.remove(id)));

  it('Should always return an Array', () => {
    expect(findByClass()).to.be.an('array');
    expect(findByClass(null)).to.be.an('array');
    expect(findByClass('item')).to.be.an('array');
  });

  it('Should find DOM elements with a given classname', () => {
    const nodes = findByClass('item');
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(4);

    expect(nodes[1]).to.have.id('Item2');
  });

  it('Should find DOM elements with all given classnames', () => {
    const nodes = findByClass('item child');
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(2);

    expect(nodes[1]).to.have.class('second-child');
  });

  it('Should filter out bad values', () => {
    let nodes = findByClass(99);
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(0);

    nodes = findByClass();
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(0);
  });

  describe('- With multiple queries', () => {
    it('Should find a unique DOM element collection from a list of classnames', () => {
      let nodes = findByClass('item, item child');
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(4);

      expect(nodes[3]).to.have.class('second-child');

      nodes = findByClass(['item', 'item child']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(4);

      expect(nodes[3]).to.have.class('second-child');
    });

    it('Should filter out bad values', () => {
      const nodes = findByClass([null, 123, undefined, {}, 'item child', ':bad-class-name']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(2);

      expect(nodes[1]).to.have.class('second-child');
    });
  });

  describe('- With defined context', () => {
    it('Should find DOM elements matching given classnames from a given DOM element context', () => {
      const nodes = findByClass(['item child', 'second-child'], helpers.id('Item2'));
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(2);

      expect(nodes[1]).to.have.class('second-child');
    });

    it('Should fallback to document on non DOM element values', () => {
      let nodes = findByClass('item', {});
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(4);

      nodes = findByClass('item', null);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(4);
    });
  });
});
