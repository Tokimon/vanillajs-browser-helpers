/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import 'babel-polyfill';

import { expect, testUtils, describe, it, before, beforeEach, after } from './assets/init-test';

import removeClass from '../removeClass';



const testID = 'TestNode';



describe('"removeClass"', () => {
  before(() => testUtils.html(`<div id="${testID}"></div>`));
  beforeEach(() => { testUtils.id(testID).className = ''; });

  after(() => testUtils.remove(testID));

  it('Should remove a given CSS class from a DOM element', () => {
    const node = testUtils.id(testID);
    node.className = 'removed';

    expect(node.className).to.equal('removed');
    removeClass(node, 'removed');
    expect(node.className).to.equal('');
  });

  it('Should always return given element', () => {
    const div = testUtils.create('div');
    expect(removeClass(null, 'inserted')).to.be.null;
    expect(removeClass({}, 'inserted')).to.be.an('object');
    expect(removeClass(div)).to.equal(div);
    expect(removeClass(div, 'inserted')).to.equal(div);
  });

  describe('- class names as Array', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = testUtils.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      removeClass(node, ['removed', 'erased', 'class3']);
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = testUtils.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      removeClass(node, ['removed', 'class3']);
      expect(node.className).to.equal('not-removed');
    });
  });

  describe('- class names as space separated String', () => {
    it('Should remove several CSS classes from a DOM element', () => {
      const node = testUtils.id(testID);
      node.className = 'removed erased class3';

      expect(node.className).to.equal('removed erased class3');
      removeClass(node, 'removed erased class3');
      expect(node.className).to.equal('');
    });

    it('Should only remove specified CSS classes from a DOM element', () => {
      const node = testUtils.id(testID);
      node.className = 'removed class3 not-removed';

      expect(node.className).to.equal('removed class3 not-removed');
      removeClass(node, 'removed class3');
      expect(node.className).to.equal('not-removed');
    });
  });
});
