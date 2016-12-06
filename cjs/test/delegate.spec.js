var _delegate = require('../delegate');

var _delegate2 = _interopRequireDefault(_delegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"delegate" package', () => {
  describe('"delegateHandler"', () => {
    it('Should return a function when all arguemnts are present', () => {
      expect((0, _delegate.delegateHandler)('body', () => {})).to.be.a('function');
    });

    it('Should return null if not all arguments are given', () => {
      expect((0, _delegate.delegateHandler)('body')).to.be.null;
      expect((0, _delegate.delegateHandler)()).to.be.null;
    });

    it('Should call handler if event target matches the delegation', () => {
      const delegateCb = sinon.spy();
      const handler = (0, _delegate.delegateHandler)('body', delegateCb);

      handler({ target: document.body });

      expect(delegateCb).to.have.been.calledOnce;
    });

    it('Should call handler if event target is a child of delegation target', () => {
      $.html('<div id="Delegate"><div id="Child"></div></div>');

      const delegateCb = sinon.spy();
      const handler = (0, _delegate.delegateHandler)('body', delegateCb);

      handler({ target: $.id('Delegate') });
      handler({ target: $.id('Child') });

      expect(delegateCb).to.have.been.calledTwice;

      $.remove('Delegate');
    });
  });

  describe('"delegateBuilder"', () => {
    it('Should return null if no function is given a parameter', () => {
      expect((0, _delegate.delegateBuilder)(null)).to.be.null;
      expect((0, _delegate.delegateBuilder)('once')).to.be.null;
      expect((0, _delegate.delegateBuilder)({})).to.be.null;
    });

    it('Should return a function if a function is given a parameter', () => {
      expect((0, _delegate.delegateBuilder)(() => {})).to.be.a('function');
    });

    it('Should use "on" as default event binding method', () => {
      // I don't really know how to test if the 'on' method has been used within
      // the function, as you can't mock the function used in the modules. Hence this vague test.
      expect((0, _delegate.delegateBuilder)()).to.be.a('function');
    });

    it('Should use specified event binding method', () => {
      const _on = sinon.spy();
      const delegateBinder = (0, _delegate.delegateBuilder)(_on);

      expect(delegateBinder).to.be.a('function');
      delegateBinder(document, 'someevent', '.delegation', () => {});
      expect(_on).to.have.been.called;
    });
  });

  describe('"delegate"', () => {
    it('Should not bind event if not all arguments are given', () => {
      expect((0, _delegate2.default)(document, 'delegate', 'body')).to.not.fail;
      expect((0, _delegate2.default)(document, 'delegate')).to.not.fail;
      expect((0, _delegate2.default)(document)).to.not.fail;
    });

    it('Should ignore objects that are not a HTML Node or window', () => {
      expect((0, _delegate2.default)(null)).to.not.fail;
      expect((0, _delegate2.default)({})).to.not.fail;
      expect((0, _delegate2.default)()).to.not.fail;
    });

    it('Should bind a delagate event handler to an object', () => {
      const delegateCb = sinon.spy();
      (0, _delegate2.default)(document, 'delegate', 'body', delegateCb);
      $.trigger('delegate', document.body);
      expect(delegateCb).to.have.been.calledOnce;
    });
  });
}); /* eslint-env node, mocha, browser */
/* global expect, $, sinon */