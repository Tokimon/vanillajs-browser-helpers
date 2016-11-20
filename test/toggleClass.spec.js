/* eslint-env node, mocha, browser */
/* global expect, $ */

import toggleClass from '../toggleClass';

const testID = 'TestNode';

describe('"toggleClass"', () => {
  before(() => document.body.insertAdjacentHTML('beforeend', `<div id="${testID}"></div>`));
  beforeEach(() => { $.id(testID).className = ''; });

  after(() => $.remove(testID));

  it('Should toggle a given class name on a DOM element', () => {
    const node = $.id(testID);
    node.className = '';

    expect(node.className).to.equal('');
    toggleClass(node, 'removed');
    expect(node.className).to.equal('removed');
    toggleClass(node, 'removed');
    expect(node.className).to.equal('');
  });

  it('Should add a given class name to a DOM element if `force` is true', () => {
    const node = $.id(testID);

    expect(node.className).to.equal('');
    toggleClass(node, 'added', true);
    expect(node.className).to.equal('added');
    toggleClass(node, 'added', true);
    expect(node.className).to.equal('added');
  });

  it('Should remove a given class name from a DOM element if `force` is false', () => {
    const node = $.id(testID);
    node.className = 'removed';

    expect(node.className).to.equal('removed');
    toggleClass(node, 'removed', false);
    expect(node.className).to.equal('');
    toggleClass(node, 'removed', false);
    expect(node.className).to.equal('');
  });

  it('Should ignore non DOM elements', () => {
    expect(toggleClass(null, 'inserted')).to.not.fail;
  });

  describe('- class names as Array', () => {
    it('Should toggle given class names on a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed';

      expect(node.className).to.equal('removed');
      toggleClass(node, ['removed', 'added', 'class3']);
      expect(node.className).to.equal('added class3');
      toggleClass(node, ['removed', 'class3']);
      expect(node.className).to.equal('added removed');
    });

    it('Should add a given class names to a DOM element if `force` is true', () => {
      const node = $.id(testID);

      expect(node.className).to.equal('');
      toggleClass(node, ['added', 'class3'], true);
      expect(node.className).to.equal('added class3');
      toggleClass(node, ['added', 'class3'], true);
      expect(node.className).to.equal('added class3');
    });

    it('Should remove a given class names from a DOM element if `force` is false', () => {
      const node = $.id(testID);
      node.className = 'removed class3';

      expect(node.className).to.equal('removed class3');
      toggleClass(node, ['removed', 'class3'], false);
      expect(node.className).to.equal('');
      toggleClass(node, ['removed', 'class3'], false);
      expect(node.className).to.equal('');
    });
  });

  describe('- class names as space separated String', () => {
    it('Should toggle given class names on a DOM element', () => {
      const node = $.id(testID);
      node.className = 'removed';

      expect(node.className).to.equal('removed');
      toggleClass(node, 'removed added class3');
      expect(node.className).to.equal('added class3');
      toggleClass(node, 'removed class3');
      expect(node.className).to.equal('added removed');
    });

    it('Should add a given class names to a DOM element if `force` is true', () => {
      const node = $.id(testID);

      expect(node.className).to.equal('');
      toggleClass(node, 'added class3', true);
      expect(node.className).to.equal('added class3');
      toggleClass(node, 'added class3', true);
      expect(node.className).to.equal('added class3');
    });

    it('Should remove a given class names from a DOM element if `force` is false', () => {
      const node = $.id(testID);
      node.className = 'removed class3';

      expect(node.className).to.equal('removed class3');
      toggleClass(node, 'removed class3', false);
      expect(node.className).to.equal('');
      toggleClass(node, 'removed class3', false);
      expect(node.className).to.equal('');
    });
  });
});
