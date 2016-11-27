/* eslint-env node, mocha, browser */
/* global expect, $ */

import addClass from '../addClass';

const testID = 'TestNode';

describe('"addClass"', () => {
  before(() => $.html(`<div id="${testID}"></div>`));
  beforeEach(() => $.id(testID).className = '');

  after(() => $.remove(testID));

  it('Should add a given CSS class to a DOM element', () => {
    const node = $.id(testID);

    expect(node.className).to.equal('');
    addClass(node, 'inserted');
    expect(node.className).to.equal('inserted');
  });

  it('Should not add a given CSS class twice to a DOM element', () => {
    const node = $.id(testID);
    node.className = 'inserted';

    expect(node.className).to.equal('inserted');
    addClass(node, 'inserted');
    expect(node.className).to.equal('inserted');
  });

  it('Should ignore non DOM elements', () => {
    expect(addClass(null, 'inserted')).to.not.fail;
  });

  describe('- class names as Array', () => {
    it('Should add several CSS classes to a DOM element', () => {
      const node = $.id(testID);

      expect(node.className).to.equal('');
      addClass(node, ['inserted', 'added', 'class3']);
      expect(node.className).to.equal('inserted added class3');
    });

    it('Should only add unset CSS classes to a DOM element', () => {
      const node = $.id(testID);
      node.className = 'inserted class3';

      expect(node.className).to.equal('inserted class3');
      addClass(node, ['inserted', 'added', 'class3']);
      expect(node.className).to.equal('inserted class3 added');
    });
  });

  describe('- class names as space separated String', () => {
    it('Should add several CSS classes to a DOM element', () => {
      const node = $.id(testID);

      expect(node.className).to.equal('');
      addClass(node, 'inserted added class3');
      expect(node.className).to.equal('inserted added class3');
    });

    it('Should only add unset CSS classes to a DOM element', () => {
      const node = $.id(testID);
      node.className = 'inserted class3';

      expect(node.className).to.equal('inserted class3');
      addClass(node, 'inserted added class3');
      expect(node.className).to.equal('inserted class3 added');
    });
  });
});