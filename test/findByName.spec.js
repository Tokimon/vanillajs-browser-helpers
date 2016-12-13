/* eslint-env node, mocha, browser */
/* global expect, $ */

import '../polyfills/array.from';
import '../polyfills/Set';

import findByName from '../findByName';

const testID = 'TestNode';

describe('"findByName"', () => {
  before(() => $.html(`
    <form id="${testID}">
      <meta name="meta">
      <input name="inputs" id="Input1">
      <input name="inputs" id="Input2">
    </form>
  `));

  after(() => $.remove(testID));

  it('Should always return an Array', () => {
    expect(findByName()).to.be.an('array');
    expect(findByName(null)).to.be.an('array');
    expect(findByName('meta')).to.be.an('array');
  });

  it('Should find DOM elements with a name attribute', () => {
    let nodes = findByName('meta');
    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(1);

    expect(nodes[0]).to.be.a('htmlmetaelement');

    nodes = findByName('inputs');

    expect(nodes)
      .to.be.a('array')
      .and.to.have.length(2);

    expect(nodes[1]).to.be.a('htmlinputelement');
  });

  it('Should return empty Array if no elements were found', () => {
    expect(findByName('not-found'))
      .to.be.a('array')
      .and.to.have.length(0);

    expect(findByName())
      .to.be.a('array')
      .and.to.have.length(0);

    expect(findByName(null))
      .to.be.a('array')
      .and.to.have.length(0);
  });

  describe('- Multi result', () => {
    it('Should find DOM elements with a name attribute from a list', () => {
      let nodes = findByName('meta, inputs');
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(3);

      expect(nodes[1]).to.have.id('Input1');

      nodes = findByName(['meta', 'inputs']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(3);

      expect(nodes[2]).to.have.id('Input2');
    });

    it('Should filter out bad values', () => {
      const nodes = findByName(['meta', 99, null, 'inputs', 'spaced name']);
      expect(nodes)
        .to.be.a('array')
        .and.to.have.length(3);

      expect(nodes[2]).to.have.id('Input2');
    });
  });
});
