/* eslint-env node, mocha, browser */
/* global expect, $, sinon */
import '../polyfills/array.from';
import '../polyfills/Map';

import on, { off, eventListId, getEvents } from '../eventPlus';

describe('"eventPlus" package', () => {
  describe('"eventListId"', () => {
    it('Should get the event list id of a DOM element', () => {
      const ids = [];

      let id = eventListId(window);
      expect(id).to.be.a('string').and.to.have.length(10);
      expect(ids).not.to.include(id);
      ids.push(id);
      expect(ids).to.include(id);
      expect(window).to.have.property('_eventlistid', id);

      id = eventListId(document);
      expect(id).to.be.a('string').and.to.have.length(10);
      expect(ids).not.to.include(id);
      ids.push(id);
      expect(ids).to.include(id);
      expect(document).to.have.property('_eventlistid', id);

      id = eventListId(document.body);
      expect(id).to.be.a('string').and.to.have.length(10);
      expect(ids).not.to.include(id);
      ids.push(id);
      expect(ids).to.include(id);
      expect(document.body).to.have.attribute('data-eventlistid', id);

      const text = document.createTextNode('TextNode');
      id = eventListId(text);
      expect(id).to.be.a('string').and.to.have.length(10);
      expect(ids).not.to.include(id);
      ids.push(id);
      expect(ids).to.include(id);
      expect(text).to.have.property('_eventlistid', id);
    });

    it('Should get the event list id of a non DOM element object that includes the "add/removeEventListener" methods', () => {
      const obj = { addEventListener() {}, removeEventListener() {} };
      const id = eventListId(obj);
      expect(id).to.be.a('string').and.to.have.length(10);
      expect(obj).to.have.property('_eventlistid', id);
    });

    it('Should ignore objects that does not include the "add/removeEventListener" methods', () => {
      expect(eventListId(null)).to.be.null;
      expect(eventListId({})).to.be.null;
      expect(eventListId({ addEventListener() {} })).to.be.null;
      expect(eventListId({ removeEventListener() {} })).to.be.null;
      expect(eventListId()).to.be.null;
    });
  });

  describe('"getEvents"', () => {
    it('Should get list of bound events of an object', () => {
      // TODO: Improve this test. It doesn't test much.
      let map = getEvents(window);
      expect(map).to.have.property('size', 0);

      map = getEvents(document);
      expect(map).to.have.property('size', 0);

      map = getEvents(document.body);
      expect(map).to.have.property('size', 0);

      map = getEvents(document.createTextNode('TextNode'));
      expect(map).to.have.property('size', 0);
    });

    it('Should ignore objects that are not eligible for an "eventListId"', () => {
      expect(getEvents()).to.be.null;
      expect(getEvents(null)).to.be.null;
      expect(getEvents({})).to.be.null;
      expect(getEvents({ addEventListener() {} })).to.be.null;
      expect(getEvents({ removeEventListener() {} })).to.be.null;
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
      expect(on(null, 'notattached', cb)).not.to.fail;
      expect(on({}, 'notattached', cb)).not.to.fail;
    });

    it('Should ignore non string/array events argument', () => {
      const cb = sinon.spy();
      expect(on(document.body, 123, cb)).not.to.fail;

      $.trigger(123, document.body);
      expect(cb).not.to.have.been.called;
    });

    it('Should ignore non function event handlers', () => {
      expect(on(document.body, 123, null)).not.to.fail;
      expect(on(document.body, 123, {})).not.to.fail;
    });

    it('Should always return the given element', () => {
      expect(on(document.body)).to.equal(document.body);
      expect(on(document.body, 'test')).to.equal(document.body);
      expect(on(document.body, 'test', () => {})).to.equal(document.body);
    });

    it('Should bind an event handler to an object', () => {
      on(window, 'on', onCb);
      on(window, 'on', winCb);
      $.trigger('on', window);
      expect(onCb).to.have.been.calledOnce;
      expect(winCb).to.have.been.calledOnce;

      onCb.reset();

      on(document, 'on', onCb);
      on(document, 'on', docCb);
      $.trigger('on', document);
      expect(onCb).to.have.been.calledTwice;
      expect(docCb).to.have.been.calledOnce;

      onCb.reset();

      on(document.body, 'on', onCb);
      on(document.body, 'on', bodyCb);
      $.trigger('on', document.body);
      expect(onCb).to.have.been.calledThrice;
      expect(bodyCb).to.have.been.calledOnce;

      onCb.reset();
    });

    it('Should bind a delagate event handler to an object', () => {
      on(document, 'delegate', 'body', delegateCb);
      $.trigger('delegate', document.body);
      expect(delegateCb).to.have.been.calledOnce;
    });

    it('Should bind a namespaced event handler to an object', () => {
      on(document.body, 'name.space', nsCb);

      $.trigger('name.space', document.body);
      $.trigger('name', document.body);

      expect(nsCb).to.have.been.calledTwice;
    });

    it('Should bind multiple event handlers to an object', () => {
      on(document.body, 'click custom', strCb);
      on(document.body, ['click', 'custom'], arrCb);

      $.trigger('click', document.body);
      $.trigger('custom', document.body);

      expect(strCb).to.have.been.calledTwice;
      expect(arrCb).to.have.been.calledTwice;
    });

    it('Should not fail event trigger if event handlers have been removed', () => {
      on(document.body, 'disapeared', strCb);
      getEvents(document.body).delete('disapeared');
      $.trigger('disapeared', document.body);
    });

    it('Should stop all subsequent handlers if false is returned from a handler', () => {
      const stopCb = sinon.stub();
      stopCb.onCall(0).returns(false);

      on(document.body, 'stop', stopCb);
      on(document.body, 'stop', stopCb);
      on(document.body, 'stop', stopCb);

      $.trigger('stop', document.body);

      expect(stopCb.callCount).to.equal(1);
    });
  });

  describe('"off"', () => {
    it('Should ignore objects that not eligible for an "eventListId"', () => {
      const cb = () => {};
      expect(off(null, 'notattached', cb)).not.to.fail;
      expect(off({}, 'notattached', cb)).not.to.fail;
    });

    it('Should remove an given event handler from an object', () => {
      onCb.reset();

      $.trigger('on', document.body);
      expect(onCb).to.have.been.calledThrice;

      onCb.reset();

      off(window, 'on', onCb);
      $.trigger('on', document.body);
      expect(onCb).to.have.been.calledTwice;

      onCb.reset();

      off(document, 'on', onCb);
      $.trigger('on', document.body);
      expect(onCb).to.have.been.calledOnce;

      onCb.reset();

      off(document.body, 'on', onCb);
      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;
    });

    it('Should ignore non bound delegates from an object', () => {
      expect(off(document, 'delegate', '.notbound', delegateCb)).not.to.fail;
    });

    it('Should remove an given delegate event handler from an object', () => {
      delegateCb.reset();
      $.trigger('delegate', document.body);
      expect(delegateCb).to.have.been.calledOnce;

      delegateCb.reset();

      off(document, 'delegate', 'body', delegateCb);
      $.trigger('delegate', document.body);
      expect(delegateCb).to.not.have.been.called;
    });

    it('Should remove all delegate event handlers with a given delegate selector from an object', () => {
      const delegateCb2 = sinon.spy();
      on(document, 'delegate', 'body', delegateCb);
      on(document, 'delegate', 'body', delegateCb2);

      $.trigger('delegate', document.body);

      expect(delegateCb).to.have.been.calledOnce;
      expect(delegateCb2).to.have.been.calledOnce;

      delegateCb.reset();
      delegateCb2.reset();

      off(document, 'delegate', 'body');

      $.trigger('delegate', document.body);

      expect(delegateCb).to.not.have.been.called;
      expect(delegateCb2).to.not.have.been.called;
    });

    it('Should remove a namespaced event handler from an object', () => {
      nsCb.reset();

      $.trigger('name.space', document.body);
      $.trigger('name', document.body);

      expect(nsCb).to.have.been.calledTwice;

      off(document.body, 'name.space', nsCb);

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

      off(document.body, 'click custom notattached', strCb);
      off(document.body, ['click', 'custom', 'notattached'], arrCb);

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

      off(window, 'on');

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;
      expect(winCb).not.to.have.been.called;
      expect(docCb).to.have.been.calledOnce;
      expect(bodyCb).to.have.been.calledOnce;

      docCb.reset();
      bodyCb.reset();

      off(document, 'on');

      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;
      expect(winCb).not.to.have.been.called;
      expect(docCb).not.to.have.been.called;
      expect(bodyCb).to.have.been.calledOnce;

      bodyCb.reset();

      off(document.body, 'on');

      // Control call to verify all handlers have been removed
      $.trigger('on', document.body);
      expect(onCb).not.to.have.been.called;
      expect(winCb).not.to.have.been.called;
      expect(docCb).not.to.have.been.called;
      expect(bodyCb).not.to.have.been.called;
    });

    it('Should remove all event handlers from an object', () => {
      expect(getEvents(window).size).to.equal(0);
      expect(getEvents(document).size).to.equal(0);
      // The attached events are:
      // - 'test' from 'Should always return the given element'
      // - 'stop' from 'Should stop all subsequent handlers...'
      expect(getEvents(document.body).size).to.equal(2);

      onCb.reset();

      on(window, 'on click test', onCb);
      on(document, 'on click test', onCb);
      on(document.body, 'on click test', onCb);

      expect(getEvents(window).size).to.equal(3);
      expect(getEvents(document).size).to.equal(3);
      expect(getEvents(document.body).size).to.equal(4);

      $.trigger('on', document.body);
      $.trigger('test', document.body);
      $.trigger('click', document.body);

      expect(onCb).to.have.callCount(9);

      onCb.reset();

      off(window);
      off(document);
      off(document.body);

      expect(getEvents(window).size).to.equal(0);
      expect(getEvents(document).size).to.equal(0);
      expect(getEvents(document.body).size).to.equal(0);

      $.trigger('on', document.body);
      $.trigger('test', document.body);
      $.trigger('click', document.body);

      expect(onCb).to.have.callCount(0);
    });
  });
});
