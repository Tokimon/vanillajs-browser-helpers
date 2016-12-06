var _findByName = require('../findByName');

var _findByName2 = _interopRequireDefault(_findByName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testID = 'TestNode'; /* eslint-env node, mocha, browser */
/* global expect, $ */

describe('"findByName"', () => {
  before(() => $.html(`
    <form id="${ testID }">
      <meta name="meta">
      <input name="inputs" id="Input1">
      <input name="inputs" id="Input2">
    </form>
  `));

  after(() => $.remove(testID));

  it('Should always return an Array', () => {
    expect((0, _findByName2.default)()).to.be.an('array');
    expect((0, _findByName2.default)(null)).to.be.an('array');
    expect((0, _findByName2.default)('meta')).to.be.an('array');
  });

  it('Should find DOM elements with a name attribute', () => {
    let nodes = (0, _findByName2.default)('meta');
    expect(nodes).to.be.a('array').and.to.have.length(1);

    expect(nodes[0]).to.be.a('htmlmetaelement');

    nodes = (0, _findByName2.default)('inputs');

    expect(nodes).to.be.a('array').and.to.have.length(2);

    expect(nodes[1]).to.be.a('htmlinputelement');
  });

  it('Should return empty Array if no elements were found', () => {
    expect((0, _findByName2.default)('not-found')).to.be.a('array').and.to.have.length(0);

    expect((0, _findByName2.default)()).to.be.a('array').and.to.have.length(0);

    expect((0, _findByName2.default)(null)).to.be.a('array').and.to.have.length(0);
  });

  describe('- Multi result', () => {
    it('Should find DOM elements with a name attribute from a list', () => {
      let nodes = (0, _findByName2.default)('meta, inputs');
      expect(nodes).to.be.a('array').and.to.have.length(3);

      expect(nodes[1]).to.have.id('Input1');

      nodes = (0, _findByName2.default)(['meta', 'inputs']);
      expect(nodes).to.be.a('array').and.to.have.length(3);

      expect(nodes[2]).to.have.id('Input2');
    });

    it('Should filter out bad values', () => {
      const nodes = (0, _findByName2.default)(['meta', 99, null, 'inputs', 'spaced name']);
      expect(nodes).to.be.a('array').and.to.have.length(3);

      expect(nodes[2]).to.have.id('Input2');
    });
  });
});