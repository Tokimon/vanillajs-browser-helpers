/* eslint-env node, mocha, browser */
/* global expect, $ */

import findById from '../findById';

const testID = 'TestNode';

describe('"findById"', () => {
  before(() => $.html(`
    <div id="${testID}"></div>
    <div id="Duplicate" class="first"></div>
    <div id="Duplicate" class="second">
      <div id='Child'></div>
      <div id='SecondChild'></div>
    </div>
  `));

  after(() => [testID, 'Duplicate', 'Duplicate'].forEach((id) => $.remove(id)));

  it('Should find a DOM Element with a given ID', () => {
    expect(findById(testID))
      .to.exist
      .and.to.have.id(testID);
  });

  it('Should find only the first DOM Element with a given duplicate ID', () => {
    expect(findById('Duplicate'))
      .to.exist
      .and.to.have.id('Duplicate')
      .and.to.have.class('first');
  });

  it('Should ignore bad ID values', () => {
    expect(findById()).to.be.null;
    expect(findById(null)).to.be.null;
    expect(findById({})).to.be.null;
    expect(findById(99)).to.be.null;
  });

  describe('- Multi result', () => {
    it('Should find DOM elements with a given ID from a list', () => {
      let nodes = findById(`${testID}, Duplicate`);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(2);

      expect(nodes[0]).to.have.id(testID);

      nodes = findById([testID, 'Duplicate']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(2);

      expect(nodes[1]).to.have.id('Duplicate');
    });

    it('Should filter out bad values', () => {
      const nodes = findById([testID, 'NotFound', null, '', {}, 99, undefined, 'Duplicate', ':bad-id']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(2);

      expect(nodes[1]).to.have.id('Duplicate');
    });
  });
});
