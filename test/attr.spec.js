/* eslint-disable no-unused-expressions */

import { expect, helpers, describe, it, beforeEach, before, after } from './assets/init-test';

import attr from '../attr';



const testID = 'AttrTest';



describe('"attr" >', () => {
  let testNode;

  before(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  beforeEach(() => {
    testNode.setAttribute('title', 'title attribute');
    testNode.setAttribute('custom', 'custom attribute');
    testNode.setAttribute('data-attr', 'data attribute');
  });

  after(() => helpers.remove(testID));

  it('Should get the value of an attribute on a DOM element', () => {
    expect(attr(testNode, 'title')).to.equal('title attribute');
  });

  it('Should get the value of a custom attribute on a DOM element', () => {
    expect(attr(testNode, 'custom')).to.equal('custom attribute');
  });

  it('Should get the value of a attribute with a dashed name on a DOM element', () => {
    expect(attr(testNode, 'data-attr')).to.equal('data attribute');
  });

  it('Should set the value of an attribute on a DOM element', () => {
    expect(attr(testNode, 'title', 'new title value')).to.equal('title attribute');
    expect(testNode).to.have.attribute('title', 'new title value');
  });

  it('Should set the value of a custom attribute on a DOM element', () => {
    expect(attr(testNode, 'custom', 'new custom value')).to.equal('custom attribute');
    expect(testNode).to.have.attribute('custom', 'new custom value');
  });

  it('Should set the value of a dashed attribute on a DOM element', () => {
    expect(attr(testNode, 'data-attr', 'new data value')).to.equal('data attribute');
    expect(testNode).to.have.attribute('data-attr', 'new data value');
  });

  it('Should set an empty attribute on a DOM element if value is true', () => {
    attr(testNode, 'empty', true);
    expect(testNode).attribute('empty').to.be.empty;
  });

  it('Should remove the attribute from a DOM element if value is false', () => {
    expect(attr(testNode, 'custom', false)).to.equal('custom attribute');
    expect(testNode).to.not.have.attribute('custom');
  });

  it('Should ignore non DOM element', () => {
    try {
      attr({});
      attr([]);
      attr(null);
      attr();
    } catch (ex) {
      expect.fail();
    }
  });
});
