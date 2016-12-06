var _elmIndex = require('../elmIndex');

var _elmIndex2 = _interopRequireDefault(_elmIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'ElmIndex'; /* eslint-env node, mocha, browser */
/* global expect, $ */

const nodeID = 'SubElem';

describe('"elmIndex"', () => {
  before(() => $.html(`<div id="${ testID }"><b></b><b id='${ nodeID }'></b><b><b>/div>`));
  after(() => $.remove(testID));

  it('Should return the index of a DOM element among its siblings', () => {
    const node = $.id(nodeID);
    const index = (0, _elmIndex2.default)(node);
    expect(index).to.equal(1);
    expect($.id(testID).childNodes[index]).to.equal(node);

    const p = $.create('p');
    p.innerHTML = '<b></b><b></b><b></b>';
    expect((0, _elmIndex2.default)(p.childNodes[2])).to.equal(2);
  });

  it('Should return -1 if the element is not a Child Element', () => {
    const node = $.create('p');
    expect((0, _elmIndex2.default)(node)).to.equal(-1);
    expect((0, _elmIndex2.default)(document.documentElement)).to.equal(-1);
  });
});