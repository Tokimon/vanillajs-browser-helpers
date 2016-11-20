/* eslint-env node, mocha, browser */
/* global expect, $ */

import removeClass from '../removeClass';

const testID = 'TestNode';

describe('"removeClass"', () => {
  before(() => $.html(`<div id="${testID}"></div>`));
  beforeEach(() => { $.id(testID).className = ''; });

  after(() => $.remove(testID));

  it('Should remove a given CSS class from a DOM element', () => {
    const node = $.id(testID);
    node.className = 'removed';

    expect(node.className).to.equal('removed');
    removeClass(node, 'removed');
    expect(node.className).to.equal('');
  });

  it('Should ignore non DOM elements', () => {
    expect(removeClass(null, 'inserted')).to.not.fail;
  });

  describe('- class names as Array', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      removeClass(node, ['removed', 'erased', 'class3']);
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      removeClass(node, ['removed', 'class3']);
      expect(node.className).to.equal('not-removed');
    });
  });

  describe('- class names as space separated String', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      removeClass(node, 'removed erased class3');
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      removeClass(node, 'removed class3');
      expect(node.className).to.equal('not-removed');
    });
  });
});
