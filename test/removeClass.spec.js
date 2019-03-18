import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import removeClass from '../removeClass';



const testID = 'TestNode';



describe('"removeClass"', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => { testNode.className = ''; });

  after(() => helpers.remove(testID));

  it('Should remove a given CSS class from a DOM element', () => {
    testNode.className = 'removed';

    removeClass(testNode, 'removed');
    expect(testNode.className).to.equal('');
  });

  it('Should always return given element', () => {
    const div = helpers.create('div');
    const obj = {};

    expect(removeClass(null, 'inserted')).to.equal(null);
    expect(removeClass(obj, 'inserted')).to.equal(obj);
    expect(removeClass(div, 'inserted')).to.equal(div);
    expect(removeClass(div)).to.equal(div);
  });

  describe('- class names as Array', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      testNode.className = 'removed erased class3';

      removeClass(testNode, ['removed', 'erased', 'class3']);
      expect(testNode.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      testNode.className = 'removed class3 not-removed';

      removeClass(testNode, ['removed', 'class3']);
      expect(testNode.className).to.equal('not-removed');
    });
  });
});
