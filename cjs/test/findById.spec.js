var _findById = require('../findById');

var _findById2 = _interopRequireDefault(_findById);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"findById"', () => {
  before(() => $.html(`
    <div id="${ testID }"></div>
    <div id="Duplicate" class="first"></div>
    <div id="Duplicate" class="second">
      <div id='Child'></div>
      <div id='SecondChild'></div>
    </div>
  `));

  after(() => [testID, 'Duplicate', 'Duplicate'].forEach(id => $.remove(id)));

  it('Should find a DOM element with a given ID', () => {
    expect((0, _findById2.default)(testID)).to.exist.and.to.have.id(testID);
  });

  it('Should find only the first DOM element with a given duplicate ID', () => {
    expect((0, _findById2.default)('Duplicate')).to.exist.and.to.have.id('Duplicate').and.to.have.class('first');
  });

  it('Should ignore bad ID values', () => {
    expect((0, _findById2.default)()).to.be.null;
    expect((0, _findById2.default)(null)).to.be.null;
    expect((0, _findById2.default)({})).to.be.null;
    expect((0, _findById2.default)(99)).to.be.null;
  });

  describe('- Multi result', () => {
    it('Should find DOM elements with a given ID from a list', () => {
      let nodes = (0, _findById2.default)(`${ testID }, Duplicate`);
      expect(nodes).to.be.a('array').and.to.have.length(2);

      expect(nodes[0]).to.have.id(testID);

      nodes = (0, _findById2.default)([testID, 'Duplicate']);
      expect(nodes).to.be.a('array').and.to.have.length(2);

      expect(nodes[1]).to.have.id('Duplicate');
    });

    it('Should filter out bad values', () => {
      const nodes = (0, _findById2.default)([testID, 'NotFound', null, '', {}, 99, undefined, 'Duplicate', ':bad-id']);
      expect(nodes).to.be.a('array').and.to.have.length(2);

      expect(nodes[1]).to.have.id('Duplicate');
    });
  });
});