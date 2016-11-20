/* eslint-env node, mocha, browser */
/* global expect, $ */

import attr from '../attr';

const testID = 'TestNode';

describe('"attr"', () => {
  before(() => $.html(`<div id="${testID}" title="title attribute" test="test attribute" data-attr="data attribute"></div>`));
  after(() => $.remove(testID));

  it('Should get the value of an attribute on a DOM element', () => {
    const node = $.id(testID);
    expect(attr(node, 'title')).to.equal('title attribute');
  });

  it('Should get the value of a custom attribute on a DOM element', () => {
    const node = $.id(testID);
    expect(attr(node, 'test')).to.equal('test attribute');
  });

  it('Should get the value of a dashed attribute on a DOM element', () => {
    const node = $.id(testID);
    expect(attr(node, 'data-attr')).to.equal('data attribute');
  });

  it('Should set the value of an attribute on a DOM element', () => {
    const node = $.id(testID);
    expect(attr(node, 'title', 'new title value')).to.equal('title attribute');
    expect(node).to.have.attribute('title', 'new title value');
  });

  it('Should set the value of a custom attribute on a DOM element', () => {
    const node = $.id(testID);
    expect(attr(node, 'test', 'new test value')).to.equal('test attribute');
    expect(node).to.have.attribute('test', 'new test value');
  });

  it('Should set the value of a dashed attribute on a DOM element', () => {
    const node = $.id(testID);
    expect(attr(node, 'data-attr', 'new data value')).to.equal('data attribute');
    expect(node).to.have.attribute('data-attr', 'new data value');
  });

  it('Should set an empty attribute on a DOM element if value is true', () => {
    const node = $.id(testID);
    attr(node, 'testempty', true);
    expect(node).attribute('testempty').to.be.empty;
  });

  it('Should remove the attribute from a DOM element if value is false', () => {
    const node = $.id(testID);
    expect(attr(node, 'test', false)).to.equal('new test value');
    expect(node).to.not.have.attribute('test');
  });

  it('Should ignore non DOM element', () => {
    expect(attr(null)).to.not.fail;
    expect(attr()).to.not.fail;
  });
});
