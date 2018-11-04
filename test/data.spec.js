import { expect, helpers, describe, it, before, after } from './assets/init-test';

import data from '../data';



const testID = 'TestNode';



describe('"data"', () => {
  before(() => helpers.html(`<div id="${testID}" data-test="data attribute" data-test-case="test case" data-boolean></div>`));
  after(() => helpers.remove(testID));

  it('Should get the value of a data attribute from a DOM element', () => {
    const node = helpers.id(testID);
    expect(data(node, 'test')).to.equal('data attribute');
  });

  it('Should set the value of a data attribute from a DOM element', () => {
    const node = helpers.id(testID);
    expect(data(node, 'test', 'new data value')).to.equal('data attribute');
    expect(node).to.have.attribute('data-test', 'new data value');
  });

  it('Should accept dashed and camelCased strings', () => {
    const node = helpers.id(testID);
    expect(data(node, 'test-case')).to.equal('test case');
    expect(data(node, 'testCase')).to.equal('test case');
  });

  it('Should return empty string if value is empty', () => {
    const node = helpers.id(testID);
    expect(data(node, 'boolean')).to.equal(true);
  });

  it('Should return null if value is unset', () => {
    const node = helpers.id(testID);
    expect(data(node, 'test-unset')).to.equal(null);
  });

  it('Should just set the data attribute if value is true or empty', () => {
    const node = helpers.id(testID);
    data(node, 'bool', true);
    expect(node).to.have.attribute('data-bool', '');
    data(node, 'bool2str', '');
    expect(node).to.have.attribute('data-bool2str', '');
    data(node, 'bool3', 'true');
    expect(node).to.have.attribute('data-bool3', 'true');
  });

  it('Should return null if data name is not given', () => {
    const node = helpers.id(testID);
    expect(data(node)).to.equal(null);
  });

  it('Should return false if elm does not support data attributes', () => {
    expect(data(window, 'test')).to.equal(false);
    expect(data(document, 'test')).to.equal(false);
    expect(data(document.createTextNode(''), 'test')).to.equal(false);
    expect(data({}, 'test')).to.equal(false);
    expect(data(null)).to.equal(false);
    expect(data()).to.equal(false);
  });
});
