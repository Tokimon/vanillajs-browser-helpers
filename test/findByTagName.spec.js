import { expect, helpers, describe, it, before, after } from './assets/init-test';

import findByTagName from '../findByTagName';



const testID = 'tagNameTest';



describe('"findByTagName"', () => {
  before(() => helpers.html(`
    <div id="${testID}">
      <div></div>
      <div></div>
      <div></div>
      <span></span>
    </div>
  `));

  after(() => helpers.remove(testID));

  it('Should always return an Array', () => {
    expect(findByTagName()).to.be.an('array');
    expect(findByTagName(null)).to.be.an('array');
  });

  it('Should find DOM elements with a given tag name', () => {
    const nodes = findByTagName('div');
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(4);

    expect(nodes.every((node) => node.nodeName === 'DIV')).to.equal(true);
  });

  it('Should filter out bad values', () => {
    let nodes = findByTagName(99);
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(0);

    nodes = findByTagName();
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(0);
  });

  describe('- With multiple queries', () => {
    it('Should find a unique DOM element collection from a list of tag names', () => {
      const nodes = findByTagName(['div', 'span']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(5);

      expect(nodes[4].nodeName).to.equal('SPAN');
    });

    it('Should filter out bad values', () => {
      const nodes = findByTagName([null, 123, undefined, {}, 'div', ':bad-tag-name']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(4);

      expect(nodes.every((node) => node.nodeName === 'DIV')).to.equal(true);
    });
  });

  describe('- With defined context', () => {
    it('Should find DOM elements matching given tag name from a given DOM element context', () => {
      const nodes = findByTagName(helpers.id(testID), 'div');
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(3);

      expect(nodes.every((node) => node.nodeName === 'DIV')).to.equal(true);
    });
  });
});
