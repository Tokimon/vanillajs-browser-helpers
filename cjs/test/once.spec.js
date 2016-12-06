var _once = require('../once');

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"once" package', () => {
      const onCb = sinon.spy();
      const strCb = sinon.spy();
      const arrCb = sinon.spy();

      describe('"onceBuilder"', () => {
            it('Should always return a function', () => {
                  expect((0, _once.onceBuilder)()).to.be.a('function');
                  expect((0, _once.onceBuilder)(null, null)).to.be.a('function');
                  expect((0, _once.onceBuilder)(null, () => {})).to.be.a('function');
                  expect((0, _once.onceBuilder)(() => {}, () => {})).to.be.a('function');
                  expect((0, _once.onceBuilder)('String', 1234)).to.be.a('function');
                  expect((0, _once.onceBuilder)(1234, 'String')).to.be.a('function');
                  expect((0, _once.onceBuilder)({})).to.be.a('function');
                  expect((0, _once.onceBuilder)(undefined, 'String')).to.be.a('function');
            });

            it('Should use "on" as default event binder and "off" as default event remover', () => {
                  // NOTE:
                  // This can't actually be tested as the "on" and "off" methods cannot be mocked from here,
                  // but it can be tested that an event has been bound and removed after event has fired
                  // even if no methods have been given

                  const customOnce = (0, _once.onceBuilder)();
                  customOnce(document.body, 'on', onCb);

                  onCb.reset();

                  expect(onCb).not.to.have.been.called;

                  $.trigger('on', document.body);
                  expect(onCb).to.have.been.calledOnce;

                  onCb.reset();

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
            });

            it('Should accept a custom "on" event binder', () => {
                  sinon.spy($, 'on');

                  const customOnce = (0, _once.onceBuilder)($.on);
                  const tempHandler = customOnce(document.body, 'on', onCb);
                  expect($.on).to.have.been.calledOnce;

                  // Clean up
                  $.off(document.body, 'on', tempHandler);

                  onCb.reset();
                  $.on.restore();
            });

            it('Should accept a custom "off" event remover', () => {
                  sinon.spy($, 'off');

                  const customOnce = (0, _once.onceBuilder)($.on, $.off);
                  customOnce(document.body, 'on', onCb);

                  onCb.reset();

                  $.trigger('on', document.body);

                  expect($.off).to.have.been.calledOnce;

                  onCb.reset();

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;

                  onCb.reset();
                  $.off.restore();
            });
      });

      describe('"once"', () => {
            it('Should return null if the handler is not a function', () => {
                  expect((0, _once2.default)(document.body, 'on')).to.be.null;
                  expect((0, _once2.default)(document.body, 'on', null)).to.be.null;
                  expect((0, _once2.default)(document.body, 'on', 'String')).to.be.null;
                  expect((0, _once2.default)(document.body, 'on', 1234)).to.be.null;
                  expect((0, _once2.default)(document.body, 'on', {})).to.be.null;
            });

            it('Should always return a function if the handler is defined', () => {
                  expect((0, _once2.default)(null, null, () => {})).to.be.a('function');
                  const tempHandler = (0, _once2.default)(document.body, 'on', () => {});
                  expect(tempHandler).to.be.a('function');
                  expect((0, _once2.default)(123, 'on', () => {})).to.be.a('function');

                  // Clean up
                  $.off(document.body, 'on', tempHandler);
            });

            it('Should not add event if handler is not defined', () => {
                  onCb.reset();

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;

                  (0, _once2.default)(document.body, 'on');

                  onCb.reset();

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
            });

            it('Should add an given event handler to an object that is triggered only once', () => {
                  onCb.reset();

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;

                  onCb.reset();

                  (0, _once2.default)(document.body, 'on', onCb);

                  $.trigger('on', document.body);
                  expect(onCb).to.have.been.calledOnce;

                  onCb.reset();

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
            });

            it('Should add multiple event handlers to an object that are triggered only once', () => {
                  strCb.reset();
                  arrCb.reset();

                  $.trigger('click', document.body);
                  $.trigger('custom', document.body);

                  expect(strCb).not.to.have.been.called;
                  expect(arrCb).not.to.have.been.called;

                  (0, _once2.default)(document.body, 'click custom', strCb);
                  (0, _once2.default)(document.body, ['click', 'custom'], arrCb);

                  strCb.reset();
                  arrCb.reset();

                  $.trigger('click', document.body);
                  $.trigger('custom', document.body);

                  expect(strCb).to.have.been.calledTwice;
                  expect(arrCb).to.have.been.calledTwice;

                  strCb.reset();
                  arrCb.reset();

                  $.trigger('click', document.body);
                  $.trigger('custom', document.body);

                  expect(strCb).not.to.have.been.called;
                  expect(arrCb).not.to.have.been.called;
            });
      });
}); /* eslint-env node, mocha, browser */
/* global expect, $, sinon */