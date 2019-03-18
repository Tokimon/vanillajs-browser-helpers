import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import addClass from '../addClass';



const testID = 'TestNode';



describe('"addClass"', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => { testNode.className = ''; });

  after(() => helpers.remove(testID));

  it('Should add a given CSS class to a DOM element', () => {
    expect(testNode.className).to.equal('');
    addClass(testNode, 'inserted');
    expect(testNode.className).to.equal('inserted');
  });

  it('Should not add a given CSS class twice to a DOM element', () => {
    testNode.className = 'inserted';

    expect(testNode.className).to.equal('inserted');
    addClass(testNode, 'inserted');
    expect(testNode.className).to.equal('inserted');
  });

  it('Should always return the given element', () => {
    const div = helpers.create('div');
    const obj = {};

    expect(addClass(null, 'inserted')).to.equal(null);
    expect(addClass(obj, 'inserted')).to.equal(obj);
    expect(addClass(div, 'inserted')).to.equal(div);
    expect(addClass(div)).to.equal(div);
  });

  describe('- Multiple class names', () => {
    it('Should add several CSS classes to a DOM element', () => {
      testNode.className = '';

      addClass(testNode, ['inserted', 'added', 'class3']);
      expect(testNode.className).to.equal('inserted added class3');
    });

    it('Should only add unset CSS classes to a DOM element', () => {
      testNode.className = 'inserted class3';

      addClass(testNode, ['inserted', 'added', 'class3']);
      expect(testNode.className).to.equal('inserted class3 added');
    });
  });
});
