var _domReady = require('../domReady');

var _domReady2 = _interopRequireDefault(_domReady);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const domreadyCb = sinon.spy(); /* eslint-env node, mocha, browser */
/* global expect, sinon */

let domLoaded = false;

function once(elm, evt, handler) {
  return elm.addEventListener(evt, function _one(e) {
    elm.removeEventListener(e.type, _one);
    return handler.call(this, e);
  }, true);
}

function afterDomLoad(cb) {
  return domLoaded ? cb() : setTimeout(() => afterDomLoad(cb), 100);
}

document.addEventListener('DOMContentLoaded', e => {
  domreadyCb(e);
  domLoaded = true;
}, true);

// We have to build the dom ready handlers here as we otherwise will be to late
// to test the dom ready event
const _once = sinon.spy();
const domReadyBinder = (0, _domReady.domReadyBuilder)(_once);
domReadyBinder(() => {});
(0, _domReady.domReadyBuilder)(once)(domreadyCb);
(0, _domReady2.default)(domreadyCb);

describe('"domReady" package', () => {
  describe('"domReadyBuilder"', () => {
    it('Should return null if no function is given a parameter', () => {
      expect((0, _domReady.domReadyBuilder)(null)).to.be.null;
      expect((0, _domReady.domReadyBuilder)('once')).to.be.null;
      expect((0, _domReady.domReadyBuilder)({})).to.be.null;
    });

    it('Should return a function if a function is given a parameter', () => {
      expect((0, _domReady.domReadyBuilder)(() => {})).to.be.a('function');
      expect((0, _domReady.domReadyBuilder)(once)).to.be.a('function');
    });

    it('Should use "once" as default event binding method', () => {
      // I don't really know how to test if the 'once' method has been used within
      // the function, as you can't mock the function used in the modules. Hence this vague test.
      expect((0, _domReady.domReadyBuilder)()).to.be.a('function');
    });

    it('Should use a specific "once" event binding method', () => {
      expect(domReadyBinder).to.be.a('function');
      expect(_once).to.have.been.called;
    });
  });

  describe('"domReady"', () => {
    it('Should not bind event if no handler is given', () => {
      expect((0, _domReady2.default)()).to.not.fail;
    });

    it('Should trigger the handler on the document ready event', done => {
      afterDomLoad(() => {
        expect(domreadyCb).to.have.been.calledThrice;
        expect(domreadyCb.firstCall.args).to.have.length(1);
        expect(domreadyCb.secondCall.args).to.have.length(0);
        expect(domreadyCb.thirdCall.args).to.have.length(0);
        done();
      });
    });

    it('Should trigger the handler if the method is bound after the DOM has finished loading', done => {
      domreadyCb.reset();
      afterDomLoad(() => {
        (0, _domReady2.default)(domreadyCb);
        expect(domreadyCb).to.have.been.calledOnce;
        done();
      });
    });
  });
});