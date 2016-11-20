/* eslint-env node, mocha, browser */
/* global expect, $ */

import elmIndex from '../elmIndex';

const testID = 'ElmIndex';
const nodeID = 'SubElem';

describe('"elmIndex"', () => {
  before(() => $.html(`<div id="${testID}"><b></b><b id='${nodeID}'></b><b><b>/div>`));
  after(() => $.remove(testID));

  it('Should return the index of a DOM element among its siblings', () => {
    const node = $.id(nodeID);
    const index = elmIndex(node);
    expect(index).to.equal(1);
    expect($.id(testID).childNodes[index]).to.equal(node);

    const p = $.create('p');
    p.innerHTML = '<b></b><b></b><b></b>';
    expect(elmIndex(p.childNodes[2])).to.equal(2);
  });

  it('Should return -1 if the element is not a Child Element', () => {
    const node = $.create('p');
    expect(elmIndex(node)).to.equal(-1);
    expect(elmIndex(document.documentElement)).to.equal(-1);
  });
});
