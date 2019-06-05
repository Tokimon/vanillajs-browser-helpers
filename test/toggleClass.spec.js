import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import toggleClass from '../toggleClass';



const testID = 'ToggleClassTest';



describe('"toggleClass" >', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => { testNode.className = ''; });

  after(() => helpers.remove(testID));

  it('Should toggle a given class name on a DOM element', () => {
    testNode.className = '';

    toggleClass(testNode, 'toggled');
    expect(testNode.className).to.equal('toggled');

    toggleClass(testNode, 'toggled');
    expect(testNode.className).to.equal('');
  });

  it('Should add a given class name to a DOM element if `force` is true', () => {
    toggleClass(testNode, 'added', true);
    expect(testNode.className).to.equal('added');

    toggleClass(testNode, 'added', true);
    expect(testNode.className).to.equal('added');
  });

  it('Should remove a given class name from a DOM element if `force` is false', () => {
    testNode.className = 'removed';

    toggleClass(testNode, 'removed', false);
    expect(testNode.className).to.equal('');

    toggleClass(testNode, 'removed', false);
    expect(testNode.className).to.equal('');
  });

  it('Should always return given element', () => {
    const div = helpers.create('div');
    const obj = {};

    expect(toggleClass(null, 'inserted')).to.equal(null);
    expect(toggleClass(obj, 'inserted')).to.be.equal(obj);
    expect(toggleClass(div, 'inserted')).to.equal(div);
    expect(toggleClass(div)).to.equal(div);
  });

  describe('class names as Array >', () => {
    it('Should toggle given class names on a DOM element', () => {
      testNode.className = 'toggled';

      toggleClass(testNode, ['toggled', 'added', 'class3']);
      expect(testNode.className).to.equal('added class3');

      toggleClass(testNode, ['toggled', 'class3']);
      expect(testNode.className).to.equal('added toggled');
    });

    it('Should add a given class names to a DOM element if `force` is true', () => {
      toggleClass(testNode, ['added', 'class3'], true);
      expect(testNode.className).to.equal('added class3');

      toggleClass(testNode, ['added', 'class3'], true);
      expect(testNode.className).to.equal('added class3');
    });

    it('Should remove a given class names from a DOM element if `force` is false', () => {
      testNode.className = 'removed class3';

      toggleClass(testNode, ['removed', 'class3'], false);
      expect(testNode.className).to.equal('');

      toggleClass(testNode, ['removed', 'class3'], false);
      expect(testNode.className).to.equal('');
    });
  });
});
