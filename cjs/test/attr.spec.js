var _attr = require('../attr');

var _attr2 = _interopRequireDefault(_attr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"attr"', () => {
  before(() => $.html(`<div id="${ testID }" title="title attribute" test="test attribute" data-attr="data attribute"></div>`));
  after(() => $.remove(testID));

  it('Should get the value of an attribute on a DOM element', () => {
    const node = $.id(testID);
    expect((0, _attr2.default)(node, 'title')).to.equal('title attribute');
  });

  it('Should get the value of a custom attribute on a DOM element', () => {
    const node = $.id(testID);
    expect((0, _attr2.default)(node, 'test')).to.equal('test attribute');
  });

  it('Should get the value of a dashed attribute on a DOM element', () => {
    const node = $.id(testID);
    expect((0, _attr2.default)(node, 'data-attr')).to.equal('data attribute');
  });

  it('Should set the value of an attribute on a DOM element', () => {
    const node = $.id(testID);
    expect((0, _attr2.default)(node, 'title', 'new title value')).to.equal('title attribute');
    expect(node).to.have.attribute('title', 'new title value');
  });

  it('Should set the value of a custom attribute on a DOM element', () => {
    const node = $.id(testID);
    expect((0, _attr2.default)(node, 'test', 'new test value')).to.equal('test attribute');
    expect(node).to.have.attribute('test', 'new test value');
  });

  it('Should set the value of a dashed attribute on a DOM element', () => {
    const node = $.id(testID);
    expect((0, _attr2.default)(node, 'data-attr', 'new data value')).to.equal('data attribute');
    expect(node).to.have.attribute('data-attr', 'new data value');
  });

  it('Should set an empty attribute on a DOM element if value is true', () => {
    const node = $.id(testID);
    (0, _attr2.default)(node, 'testempty', true);
    expect(node).attribute('testempty').to.be.empty;
  });

  it('Should remove the attribute from a DOM element if value is false', () => {
    const node = $.id(testID);
    expect((0, _attr2.default)(node, 'test', false)).to.equal('new test value');
    expect(node).to.not.have.attribute('test');
  });

  it('Should ignore non DOM element', () => {
    expect((0, _attr2.default)(null)).to.not.fail;
    expect((0, _attr2.default)()).to.not.fail;
  });
});