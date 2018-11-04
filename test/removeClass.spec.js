import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import removeClass from '../removeClass';



const testID = 'TestNode';



describe('"removeClass"', () => {
  before(() => helpers.html(`<div id="${testID}"></div>`));
  beforeEach(() => { helpers.id(testID).className = ''; });

  after(() => helpers.remove(testID));

  it('Should remove a given CSS class from a DOM element', () => {
    const node = helpers.id(testID);
    node.className = 'removed';

    expect(node.className).to.equal('removed');
    removeClass(node, 'removed');
    expect(node.className).to.equal('');
  });

  it('Should always return given element', () => {
    const div = helpers.create('div');
    expect(removeClass(null, 'inserted')).to.equal(null);
    expect(removeClass({}, 'inserted')).to.be.an('object');
    expect(removeClass(div)).to.equal(div);
    expect(removeClass(div, 'inserted')).to.equal(div);
  });

  describe('- class names as Array', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = helpers.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      removeClass(node, ['removed', 'erased', 'class3']);
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = helpers.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      removeClass(node, ['removed', 'class3']);
      expect(node.className).to.equal('not-removed');
    });
  });

  describe('- class names as space separated String', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = helpers.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      removeClass(node, 'removed erased class3');
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = helpers.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      removeClass(node, 'removed class3');
      expect(node.className).to.equal('not-removed');
    });
  });
});
