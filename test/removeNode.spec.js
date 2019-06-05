/* eslint-disable no-unused-expressions */

import { expect, helpers, describe, it, after } from './assets/init-test';

import removeNode from '../removeNode';



const testID = 'RemoveNodeTest';

const appendTestNode = () => {
  removeTestNode();
  helpers.html(`<div id="${testID}"></div>`);
  return helpers.id(testID);
};

const removeTestNode = () => helpers.remove('testNode');



describe('"removeNode" >', () => {
  after(removeTestNode);

  it('Should ignore non DOM child elements', () => {
    try {
      removeNode(null);
      removeNode(document);
      removeNode(document.documentElement);
      removeNode(window);
    } catch (ex) {
      expect.fail();
    }
  });

  it('Should remove a given DOM element', () => {
    const testNode = appendTestNode();

    removeNode(testNode);
    expect(helpers.id(testID)).to.equal(null);
    expect(testNode.parentNode).to.equal(null);
  });

  it('Should always return the removed element', () => {
    const testNode = appendTestNode();

    expect(removeNode(null)).to.equal(null);
    expect(removeNode(document)).to.equal(document);
    expect(removeNode(window)).to.equal(window);
    expect(removeNode(testNode)).to.equal(testNode);
  });
});
