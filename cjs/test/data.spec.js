var _data = require('../data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"data"', () => {
  before(() => $.html(`<div id="${ testID }" data-test="data attribute" data-test-case="test case" data-boolean></div>`));
  after(() => $.remove(testID));

  it('Should get the value of a data attribute from a DOM element', () => {
    const node = $.id(testID);
    expect((0, _data2.default)(node, 'test')).to.equal('data attribute');
  });

  it('Should set the value of a data attribute from a DOM element', () => {
    const node = $.id(testID);
    expect((0, _data2.default)(node, 'test', 'new data value')).to.equal('data attribute');
    expect(node).to.have.attribute('data-test', 'new data value');
  });

  it('Should accept dashed and camelCased strings', () => {
    const node = $.id(testID);
    expect((0, _data2.default)(node, 'test-case')).to.equal('test case');
    expect((0, _data2.default)(node, 'testCase')).to.equal('test case');
  });

  it('Should return empty string if value is empty', () => {
    const node = $.id(testID);
    expect((0, _data2.default)(node, 'boolean')).to.be.true;
  });

  it('Should return null if value is unset', () => {
    const node = $.id(testID);
    expect((0, _data2.default)(node, 'test-unset')).to.be.null;
  });

  it('Should just set the data attribute if value is true or empty', () => {
    const node = $.id(testID);
    (0, _data2.default)(node, 'bool', true);
    expect(node).to.have.attribute('data-bool', '');
    (0, _data2.default)(node, 'bool2str', '');
    expect(node).to.have.attribute('data-bool2str', '');
    (0, _data2.default)(node, 'bool3', 'true');
    expect(node).to.have.attribute('data-bool3', 'true');
  });

  it('Should return null if data name is not given', () => {
    const node = $.id(testID);
    expect((0, _data2.default)(node)).to.be.null;
  });

  it('Should return false if elm does not support data attributes', () => {
    expect((0, _data2.default)(window, 'test')).to.be.false;
    expect((0, _data2.default)(document, 'test')).to.be.false;
    expect((0, _data2.default)(document.createTextNode(''), 'test')).to.be.false;
    expect((0, _data2.default)({}, 'test')).to.be.false;
    expect((0, _data2.default)(null)).to.be.false;
    expect((0, _data2.default)()).to.be.false;
  });
});