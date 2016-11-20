/* eslint-env node, mocha, browser */
/* global expect, $ */

import removeElm from '../removeElm';

const testID = 'TestNode';

describe('"removeElm"', () => {
  before(() => $.html(`<div id="${testID}"></div>`));
  after(() => $.remove(testID));

  it('Should ignore non DOM child elements', () => {
    expect(removeElm(null)).to.not.fail;
    expect(removeElm(document)).to.not.fail;
    expect(removeElm(window)).to.not.fail;
  });

  it('Should remove a given DOM element', () => {
    expect($.id(testID)).to.be.a('htmldivelement');
    removeElm($.id(testID));
    expect($.id(testID)).to.be.null;
  });
});
