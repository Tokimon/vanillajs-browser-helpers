import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import addClass from '../addClass';



const testID = 'TestNode';



describe('"addClass"', () => {
  before(() => helpers.html(`<div id="${testID}"></div>`));
  beforeEach(() => { helpers.id(testID).className = ''; });

  after(() => helpers.remove(testID));

  it('Should add a given CSS class to a DOM element', () => {
    const node = helpers.id(testID);

    expect(node.className).to.equal('');
    addClass(node, 'inserted');
    expect(node.className).to.equal('inserted');
  });

  it('Should not add a given CSS class twice to a DOM element', () => {
    const node = helpers.id(testID);
    node.className = 'inserted';

    expect(node.className).to.equal('inserted');
    addClass(node, 'inserted');
    expect(node.className).to.equal('inserted');
  });

  it('Should always return the given element', () => {
    const node = helpers.id(testID);

    expect(addClass(null, 'always')).to.equal(null);
    expect(addClass(node, 'always')).to.equal(node);

    expect(addClass(null)).to.equal(null);
    expect(addClass(node)).to.equal(node);
  });

  describe('- Multiple class names', () => {
    it('Should add several CSS classes to a DOM element', () => {
      const node = helpers.id(testID);

      expect(node.className).to.equal('');
      addClass(node, 'inserted added class3');
      expect(node.className).to.equal('inserted added class3');

      node.className = '';

      addClass(node, 'inserted, added, class3');
      expect(node.className).to.equal('inserted added class3');

      node.className = '';

      addClass(node, ['inserted', 'added', 'class3']);
      expect(node.className).to.equal('inserted added class3');
    });

    it('Should only add unset CSS classes to a DOM element', () => {
      const node = helpers.id(testID);
      node.className = 'inserted class3';

      expect(node.className).to.equal('inserted class3');
      addClass(node, 'inserted added class3');
      expect(node.className).to.equal('inserted class3 added');
    });
  });
});
