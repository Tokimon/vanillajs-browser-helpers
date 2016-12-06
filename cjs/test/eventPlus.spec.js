var _eventPlus = require('../eventPlus');

var _eventPlus2 = _interopRequireDefault(_eventPlus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('"eventPlus" package', () => {
      describe('"eventListId"', () => {
            it('Should get the event list id of a DOM element', () => {
                  const ids = [];

                  let id = (0, _eventPlus.eventListId)(window);
                  expect(id).to.be.a('string').and.to.have.length(10);
                  expect(ids).not.to.include(id);
                  ids.push(id);
                  expect(ids).to.include(id);
                  expect(window).to.have.property('_eventlistid', id);

                  id = (0, _eventPlus.eventListId)(document);
                  expect(id).to.be.a('string').and.to.have.length(10);
                  expect(ids).not.to.include(id);
                  ids.push(id);
                  expect(ids).to.include(id);
                  expect(document).to.have.property('_eventlistid', id);

                  id = (0, _eventPlus.eventListId)(document.body);
                  expect(id).to.be.a('string').and.to.have.length(10);
                  expect(ids).not.to.include(id);
                  ids.push(id);
                  expect(ids).to.include(id);
                  expect(document.body).to.have.attribute('data-eventlistid', id);

                  const text = document.createTextNode('TextNode');
                  id = (0, _eventPlus.eventListId)(text);
                  expect(id).to.be.a('string').and.to.have.length(10);
                  expect(ids).not.to.include(id);
                  ids.push(id);
                  expect(ids).to.include(id);
                  expect(text).to.have.property('_eventlistid', id);
            });

            it('Should get the event list id of a non DOM element object that includes the "add/removeEventListener" methods', () => {
                  const obj = { addEventListener() {}, removeEventListener() {} };
                  const id = (0, _eventPlus.eventListId)(obj);
                  expect(id).to.be.a('string').and.to.have.length(10);
                  expect(obj).to.have.property('_eventlistid', id);
            });

            it('Should ignore objects that does not include the "add/removeEventListener" methods', () => {
                  expect((0, _eventPlus.eventListId)(null)).to.be.null;
                  expect((0, _eventPlus.eventListId)({})).to.be.null;
                  expect((0, _eventPlus.eventListId)({ addEventListener() {} })).to.be.null;
                  expect((0, _eventPlus.eventListId)({ removeEventListener() {} })).to.be.null;
                  expect((0, _eventPlus.eventListId)()).to.be.null;
            });
      });

      describe('"getEvents"', () => {
            it('Should get list of bound events of an object', () => {
                  // TODO: Improve this test. It doesn't test much.
                  let map = (0, _eventPlus.getEvents)(window);
                  expect(map).to.have.property('size', 0);

                  map = (0, _eventPlus.getEvents)(document);
                  expect(map).to.have.property('size', 0);

                  map = (0, _eventPlus.getEvents)(document.body);
                  expect(map).to.have.property('size', 0);

                  map = (0, _eventPlus.getEvents)(document.createTextNode('TextNode'));
                  expect(map).to.have.property('size', 0);
            });

            it('Should ignore objects that are not eligible for an "eventListId"', () => {
                  expect((0, _eventPlus.getEvents)()).to.be.null;
                  expect((0, _eventPlus.getEvents)(null)).to.be.null;
                  expect((0, _eventPlus.getEvents)({})).to.be.null;
                  expect((0, _eventPlus.getEvents)({ addEventListener() {} })).to.be.null;
                  expect((0, _eventPlus.getEvents)({ removeEventListener() {} })).to.be.null;
            });
      });

      const onCb = sinon.spy();
      const delegateCb = sinon.spy();
      const winCb = sinon.spy();
      const docCb = sinon.spy();
      const bodyCb = sinon.spy();
      const nsCb = sinon.spy();
      const strCb = sinon.spy();
      const arrCb = sinon.spy();

      describe('"on"', () => {
            it('Should ignore objects that not eligible for an "eventListId"', () => {
                  // This test is a bit vague, but i couldn't find a proper way to test this otherwise,
                  // as there are not event storage for these types of objects and there shouldn't be a
                  // addEventListener. So I found it safe to assume that at least it shouldn't fail.
                  const cb = () => {};
                  expect((0, _eventPlus2.default)(null, 'notattached', cb)).not.to.fail;
                  expect((0, _eventPlus2.default)({}, 'notattached', cb)).not.to.fail;
            });

            it('Should ignore non string/array events argument', () => {
                  const cb = sinon.spy();
                  expect((0, _eventPlus2.default)(document.body, 123, cb)).not.to.fail;

                  $.trigger(123, document.body);
                  expect(cb).not.to.have.been.called;
            });

            it('Should ignore non function event handlers', () => {
                  expect((0, _eventPlus2.default)(document.body, 123, null)).not.to.fail;
                  expect((0, _eventPlus2.default)(document.body, 123, {})).not.to.fail;
            });

            it('Should always return the given element', () => {
                  expect((0, _eventPlus2.default)(document.body)).to.equal(document.body);
                  expect((0, _eventPlus2.default)(document.body, 'test')).to.equal(document.body);
                  expect((0, _eventPlus2.default)(document.body, 'test', () => {})).to.equal(document.body);
            });

            it('Should bind an event handler to an object', () => {
                  (0, _eventPlus2.default)(window, 'on', onCb);
                  (0, _eventPlus2.default)(window, 'on', winCb);
                  $.trigger('on', window);
                  expect(onCb).to.have.been.calledOnce;
                  expect(winCb).to.have.been.calledOnce;

                  onCb.reset();

                  (0, _eventPlus2.default)(document, 'on', onCb);
                  (0, _eventPlus2.default)(document, 'on', docCb);
                  $.trigger('on', document);
                  expect(onCb).to.have.been.calledTwice;
                  expect(docCb).to.have.been.calledOnce;

                  onCb.reset();

                  (0, _eventPlus2.default)(document.body, 'on', onCb);
                  (0, _eventPlus2.default)(document.body, 'on', bodyCb);
                  $.trigger('on', document.body);
                  expect(onCb).to.have.been.calledThrice;
                  expect(bodyCb).to.have.been.calledOnce;

                  onCb.reset();
            });

            it('Should bind a delagate event handler to an object', () => {
                  (0, _eventPlus2.default)(document, 'delegate', 'body', delegateCb);
                  $.trigger('delegate', document.body);
                  expect(delegateCb).to.have.been.calledOnce;
            });

            it('Should bind a namespaced event handler to an object', () => {
                  (0, _eventPlus2.default)(document.body, 'name.space', nsCb);

                  $.trigger('name.space', document.body);
                  $.trigger('name', document.body);

                  expect(nsCb).to.have.been.calledTwice;
            });

            it('Should bind multiple event handlers to an object', () => {
                  (0, _eventPlus2.default)(document.body, 'click custom', strCb);
                  (0, _eventPlus2.default)(document.body, ['click', 'custom'], arrCb);

                  $.trigger('click', document.body);
                  $.trigger('custom', document.body);

                  expect(strCb).to.have.been.calledTwice;
                  expect(arrCb).to.have.been.calledTwice;
            });

            it('Should not fail event trigger if event handlers have been removed', () => {
                  (0, _eventPlus2.default)(document.body, 'disapeared', strCb);
                  (0, _eventPlus.getEvents)(document.body).delete('disapeared');
                  $.trigger('disapeared', document.body);
            });

            it('Should stop all subsequent handlers if false is returned from a handler', () => {
                  const stopCb = sinon.stub();
                  stopCb.onCall(0).returns(false);

                  (0, _eventPlus2.default)(document.body, 'stop', stopCb);
                  (0, _eventPlus2.default)(document.body, 'stop', stopCb);
                  (0, _eventPlus2.default)(document.body, 'stop', stopCb);

                  $.trigger('stop', document.body);

                  expect(stopCb.callCount).to.equal(1);
            });
      });

      describe('"off"', () => {
            it('Should ignore objects that not eligible for an "eventListId"', () => {
                  const cb = () => {};
                  expect((0, _eventPlus.off)(null, 'notattached', cb)).not.to.fail;
                  expect((0, _eventPlus.off)({}, 'notattached', cb)).not.to.fail;
            });

            it('Should remove an given event handler from an object', () => {
                  onCb.reset();

                  $.trigger('on', document.body);
                  expect(onCb).to.have.been.calledThrice;

                  onCb.reset();

                  (0, _eventPlus.off)(window, 'on', onCb);
                  $.trigger('on', document.body);
                  expect(onCb).to.have.been.calledTwice;

                  onCb.reset();

                  (0, _eventPlus.off)(document, 'on', onCb);
                  $.trigger('on', document.body);
                  expect(onCb).to.have.been.calledOnce;

                  onCb.reset();

                  (0, _eventPlus.off)(document.body, 'on', onCb);
                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
            });

            it('Should ignore non bound delegates from an object', () => {
                  expect((0, _eventPlus.off)(document, 'delegate', '.notbound', delegateCb)).not.to.fail;
            });

            it('Should remove an given delegate event handler from an object', () => {
                  delegateCb.reset();
                  $.trigger('delegate', document.body);
                  expect(delegateCb).to.have.been.calledOnce;

                  delegateCb.reset();

                  (0, _eventPlus.off)(document, 'delegate', 'body', delegateCb);
                  $.trigger('delegate', document.body);
                  expect(delegateCb).to.not.have.been.called;
            });

            it('Should remove all delegate event handlers with a given delegate selector from an object', () => {
                  const delegateCb2 = sinon.spy();
                  (0, _eventPlus2.default)(document, 'delegate', 'body', delegateCb);
                  (0, _eventPlus2.default)(document, 'delegate', 'body', delegateCb2);

                  $.trigger('delegate', document.body);

                  expect(delegateCb).to.have.been.calledOnce;
                  expect(delegateCb2).to.have.been.calledOnce;

                  delegateCb.reset();
                  delegateCb2.reset();

                  (0, _eventPlus.off)(document, 'delegate', 'body');

                  $.trigger('delegate', document.body);

                  expect(delegateCb).to.not.have.been.called;
                  expect(delegateCb2).to.not.have.been.called;
            });

            it('Should remove a namespaced event handler from an object', () => {
                  nsCb.reset();

                  $.trigger('name.space', document.body);
                  $.trigger('name', document.body);

                  expect(nsCb).to.have.been.calledTwice;

                  (0, _eventPlus.off)(document.body, 'name.space', nsCb);

                  nsCb.reset();

                  $.trigger('name.space', document.body);
                  $.trigger('name', document.body);

                  expect(nsCb).to.not.have.been.called;
            });

            it('Should remove multiple event handlers from an object', () => {
                  strCb.reset();
                  arrCb.reset();

                  $.trigger('click', document.body);
                  $.trigger('custom', document.body);

                  expect(strCb).to.have.been.calledTwice;
                  expect(arrCb).to.have.been.calledTwice;

                  (0, _eventPlus.off)(document.body, 'click custom notattached', strCb);
                  (0, _eventPlus.off)(document.body, ['click', 'custom', 'notattached'], arrCb);

                  strCb.reset();
                  arrCb.reset();

                  $.trigger('click', document.body);
                  $.trigger('custom', document.body);

                  expect(strCb).to.not.have.been.called;
                  expect(arrCb).to.not.have.been.called;
            });

            it('Should remove all event handlers of a given event type from an object', () => {
                  onCb.reset();
                  winCb.reset();
                  docCb.reset();
                  bodyCb.reset();

                  // Control call to verify we have the expected handlers
                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
                  expect(winCb).to.have.been.calledOnce;
                  expect(docCb).to.have.been.calledOnce;
                  expect(bodyCb).to.have.been.calledOnce;

                  winCb.reset();
                  docCb.reset();
                  bodyCb.reset();

                  (0, _eventPlus.off)(window, 'on');

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
                  expect(winCb).not.to.have.been.called;
                  expect(docCb).to.have.been.calledOnce;
                  expect(bodyCb).to.have.been.calledOnce;

                  docCb.reset();
                  bodyCb.reset();

                  (0, _eventPlus.off)(document, 'on');

                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
                  expect(winCb).not.to.have.been.called;
                  expect(docCb).not.to.have.been.called;
                  expect(bodyCb).to.have.been.calledOnce;

                  bodyCb.reset();

                  (0, _eventPlus.off)(document.body, 'on');

                  // Control call to verify all handlers have been removed
                  $.trigger('on', document.body);
                  expect(onCb).not.to.have.been.called;
                  expect(winCb).not.to.have.been.called;
                  expect(docCb).not.to.have.been.called;
                  expect(bodyCb).not.to.have.been.called;
            });

            it('Should remove all event handlers from an object', () => {
                  expect((0, _eventPlus.getEvents)(window).size).to.equal(0);
                  expect((0, _eventPlus.getEvents)(document).size).to.equal(0);
                  // The attached events are:
                  // - 'test' from 'Should always return the given element'
                  // - 'stop' from 'Should stop all subsequent handlers...'
                  expect((0, _eventPlus.getEvents)(document.body).size).to.equal(2);

                  onCb.reset();

                  (0, _eventPlus2.default)(window, 'on click test', onCb);
                  (0, _eventPlus2.default)(document, 'on click test', onCb);
                  (0, _eventPlus2.default)(document.body, 'on click test', onCb);

                  expect((0, _eventPlus.getEvents)(window).size).to.equal(3);
                  expect((0, _eventPlus.getEvents)(document).size).to.equal(3);
                  expect((0, _eventPlus.getEvents)(document.body).size).to.equal(4);

                  $.trigger('on', document.body);
                  $.trigger('test', document.body);
                  $.trigger('click', document.body);

                  expect(onCb).to.have.callCount(9);

                  onCb.reset();

                  (0, _eventPlus.off)(window);
                  (0, _eventPlus.off)(document);
                  (0, _eventPlus.off)(document.body);

                  expect((0, _eventPlus.getEvents)(window).size).to.equal(0);
                  expect((0, _eventPlus.getEvents)(document).size).to.equal(0);
                  expect((0, _eventPlus.getEvents)(document.body).size).to.equal(0);

                  $.trigger('on', document.body);
                  $.trigger('test', document.body);
                  $.trigger('click', document.body);

                  expect(onCb).to.have.callCount(0);
            });
      });
}); /* eslint-env node, mocha, browser */
/* global expect, $, sinon */