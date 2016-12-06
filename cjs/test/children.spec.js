var _children = require('../children');

var _children2 = _interopRequireDefault(_children);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */


describe('"children"', () => {
  before(() => $.html(`<div id="${ testID }">
  <span><b></b></span>
  text
  <br>
  <span><i></i><span>
</div>`));

  after(() => $.remove(testID));

  it('Should get all the children of a given DOM element', () => {
    const node = $.id(testID);
    const childs = (0, _children2.default)(node);

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(3);
  });

  it('Should return an empty Array if a non DOM element is passed in as elm argument', () => {
    let childs = (0, _children2.default)(null);

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(0);

    childs = (0, _children2.default)({});

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(0);
  });

  it('Should return child elements of an element not yet in the DOM', () => {
    const div = $.create('div');
    div.innerHTML = `
    <span><b></b></span>
    text
    <br>
    <span><i></i><span>
    `;

    const childs = (0, _children2.default)(div);

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(3);
  });
});