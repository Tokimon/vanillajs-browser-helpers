/* eslint-env node, mocha, browser */
/* global expect, $, sinon */
import 'polyfills/array-from-polyfill';
import 'polyfills/Map';

import on, { off, eventListId, getEvents } from '../eventPlus';

// TODO: Should probably avoid having too tight a connection between on and off methods and not share spys

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

      id = eventListId(d);
      expect(id).to.be.a('string').and.to.have.length(10);
      expect(ids).not.to.include(id);
      ids.push(id);
      expect(ids).to.include(id);
      expect(d).to.have.property('_eventlistid', id);

      id = eventListId(b);
      expect(id).to.be.a('string').and.to.have.length(10);
      expect(ids).not.to.include(id);
      ids.push(id);
      expect(ids).to.include(id);
      expect(b).to.have.attribute('data-eventlistid', id);

      const text = d.createTextNode('TextNode');
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
      const cb = () => {};

      const test = (elm) => {
        expect(getEvents(elm)).to.have.property('size', 0);

        on(elm, 'test', cb);

        expect(getEvents(elm)).to.have.property('size', 1);
        expect(getEvents(elm).has('test')).to.be.true;

        off(elm, 'test', cb);

        expect(getEvents(elm)).to.have.property('size', 0);
        expect(getEvents(elm).has('test')).to.be.false;
      };

      test(window);
      test(d);
      test(b);
      test(d.createTextNode('TextNode'));
    });

    it('Should ignore objects that are not eligible for an "eventListId"', () => {
      expect(getEvents()).to.be.null;
      expect(getEvents(null)).to.be.null;
      expect(getEvents({})).to.be.null;
      expect(getEvents({ addEventListener() {} })).to.be.null;
      expect(getEvents({ removeEventListener() {} })).to.be.null;
    });
  });

  const d = document;
  const b = d.body;

  describe('"on"', () => {
    it('Should fallback to document, if the element is not a DOM Node', () => {
      const cb = sinon.spy();

      expect(on('test-undefined', cb)).to.be.equal(d);
      expect(on(null, 'test-null', cb)).to.be.equal(d);
      expect(on({}, 'test-object', cb)).to.be.equal(d);
      expect(on(123, 'test-number', cb)).to.be.equal(d);

      $.trigger('test-undefined', d);
      $.trigger('test-null', d);
      $.trigger('test-object', d);
      $.trigger('test-number', d);

      expect(cb).to.have.callCount(4);

      cb.reset();

      off(d);
    });

    it('Should ignore non string/array events argument', () => {
      const cb = sinon.spy();

      expect(on(cb)).to.be.equal(d);
      expect(getEvents(d).has(undefined)).to.be.false;
      expect(getEvents(d).has('undefined')).to.be.false;

      expect(on(b, cb)).to.be.equal(b);
      expect(on(b, null, cb)).to.be.equal(b);
      expect(on(b, 123, cb)).to.be.equal(b);
      expect(on(b, {}, cb)).to.be.equal(b);

      const evts = getEvents(b);
      expect(evts.has(undefined)).to.be.false;
      expect(evts.has('undefined')).to.be.false;
      expect(evts.has(null)).to.be.false;
      expect(evts.has('null')).to.be.false;
      expect(evts.has(123)).to.be.false;
      expect(evts.has('123')).to.be.false;
      expect(evts.has({})).to.be.false;
      expect(evts.has('[object Object]')).to.be.false;
    });

    it('Should ignore non function event handlers', () => {
      expect(on(b, 'nohandler')).to.be.equal(b);
      expect(on(b, 'nohandler', null)).to.be.equal(b);
      expect(on(b, 'nohandler', {})).to.be.equal(b);
      expect(on(b, 'nohandler', 123)).to.be.equal(b);
      expect(on(b, 'nohandler', '.delegation')).to.be.equal(b);

      expect(getEvents(b).has('nohandler')).to.be.false;
      expect(getEvents(b)).to.have.property('size', 0);
    });

    it('Should bind an event handler to an object', () => {
      const cb = sinon.spy();
      const cbWin = sinon.spy();

      expect(on(window, 'test', cb)).to.equal(window);

      on(window, 'test_underscore', cbWin);
      on(window, 'test-dash', cbWin);
      on(window, 'test:colon', cbWin);

      $.trigger('test', window);
      $.trigger('test_underscore', window);
      $.trigger('test-dash', window);
      $.trigger('test:colon', window);

      expect(cb).to.have.been.calledOnce;
      expect(cbWin).to.have.callCount(3);

      cb.reset();
      cbWin.reset();

      const cbDoc = sinon.spy();

      expect(on(d, 'test', cb)).to.equal(d);

      on(d, 'test_underscore', cbDoc);
      on(d, 'test-dash', cbDoc);
      on(d, 'test:colon', cbDoc);

      $.trigger('test', d);
      $.trigger('test_underscore', d);
      $.trigger('test-dash', d);
      $.trigger('test:colon', d);

      expect(cb).to.have.been.calledTwice;
      expect(cbWin).to.have.calledTrice;
      expect(cbDoc).to.have.calledTrice;

      cb.reset();
      cbWin.reset();
      cbDoc.reset();

      const cbBody = sinon.spy();

      expect(on(b, 'test', cb)).to.equal(b);

      on(b, 'test_underscore', cbBody);
      on(b, 'test-dash', cbBody);
      on(b, 'test:colon', cbBody);

      $.trigger('test', b);
      $.trigger('test_underscore', b);
      $.trigger('test-dash', b);
      $.trigger('test:colon', b);

      expect(cb).to.have.been.calledTrice;
      expect(cbWin).to.have.calledTrice;
      expect(cbDoc).to.have.calledTrice;
      expect(cbBody).to.have.calledTrice;

      off(window);
      off(d);
      off(b);
    });

    it('Should bind a delagate event handler to an object', () => {
      const cb = sinon.spy();

      on(d, 'delegate', 'body', cb);
      $.trigger('delegate', b);
      expect(cb).to.have.been.calledOnce;

      off(d);
    });

    it('Should bind a namespaced event handler to an object', () => {
      const cb = sinon.spy();

      on(b, 'name.space', cb);

      $.trigger('name.space', b);
      $.trigger('name', b);

      expect(cb).to.have.been.calledTwice;

      off(b);
    });

    it('Should bind multiple event handlers to an object', () => {
      const cb = sinon.spy();
      const cb2 = sinon.spy();
      const cb3 = sinon.spy();
      const cb4 = sinon.spy();
      const cb5 = sinon.spy();

      on(b, 'click touch custom', cb);
      on(b, 'click,touch, custom', cb2);
      on(b, ['click touch', 'custom'], cb3);
      on(b, ['click', 'touch', 'custom'], cb4);
      on(b, ['click, touch', null, 'custom'], cb5);

      $.trigger('click', b);
      $.trigger('touch', b);
      $.trigger('custom', b);

      expect(cb).to.have.been.calledTrice;
      expect(cb2).to.have.been.calledTrice;
      expect(cb3).to.have.been.calledTrice;
      expect(cb4).to.have.been.calledTrice;
      expect(cb5).to.have.been.calledTrice;

      off(b);
    });

    it('Should not fail if event handlers have been removed', () => {
      const cb = sinon.spy();

      on(b, 'disapeared', cb);
      getEvents(b).delete('disapeared');
      $.trigger('disapeared', b);

      expect(cb).not.to.have.been.called;

      off(b);
    });

    it('Should stop all subsequent handlers if false is returned from a handler', () => {
      const stopCb = sinon.stub();
      const stopCb2 = sinon.spy();
      const stopCb3 = sinon.spy();

      stopCb.onCall(0).returns(false);

      on(b, 'stop', stopCb);
      on(b, 'stop', stopCb2);
      on(b, 'stop', stopCb3);

      $.trigger('stop', b);

      expect(stopCb).to.have.been.calledOnce;
      expect(stopCb2).not.to.have.been.called;
      expect(stopCb3).not.to.have.been.called;

      off(b);
    });
  });

  describe('"off"', () => {
    it('Should fallback to document, if the element is not a DOM Node', () => {
      const cb = sinon.spy();

      on('test-undefined', cb);
      on(null, 'test-null', cb);
      on({}, 'test-object', cb);
      on(123, 'test-number', cb);

      $.trigger('test-undefined', d);
      $.trigger('test-null', d);
      $.trigger('test-object', d);
      $.trigger('test-number', d);

      expect(cb).to.have.callCount(4);

      expect(off('test-undefined', cb)).to.be.equal(d);
      expect(off(null, 'test-null', cb)).to.be.equal(d);
      expect(off({}, 'test-object', cb)).to.be.equal(d);
      expect(off(123, 'test-number', cb)).to.be.equal(d);

      cb.reset();

      $.trigger('test-undefined', d);
      $.trigger('test-null', d);
      $.trigger('test-object', d);
      $.trigger('test-number', d);

      expect(cb).not.to.have.been.called;
    });

    it('Should remove an given event handler from an object', () => {
      const cb = sinon.spy();
      const cb2 = sinon.spy();
      const cb3 = sinon.spy();
      const cb4 = sinon.spy();

      on(window, 'test', cb);
      on(window, 'test_underscore', cb2);
      on(window, 'test-dash', cb3);
      on(window, 'test:colon', cb4);

      on(d, 'test', cb);
      on(d, 'test_underscore', cb2);
      on(d, 'test-dash', cb3);
      on(d, 'test:colon', cb4);

      on(b, 'test', cb);
      on(b, 'test_underscore', cb2);
      on(b, 'test-dash', cb3);
      on(b, 'test:colon', cb4);

      const trigger = () => {
        $.trigger('test', b);
        $.trigger('test_underscore', b);
        $.trigger('test-dash', b);
        $.trigger('test:colon', b);
      };

      const remove = (elm) => {
        expect(off(elm, 'test', cb)).to.equal(elm);
        expect(off(elm, 'test_underscore', cb2)).to.equal(elm);
        expect(off(elm, 'test-dash', cb3)).to.equal(elm);
        expect(off(elm, 'test:colon', cb4)).to.equal(elm);
      };

      const callCount = (count) => {
        expect(cb).to.have.callCount(count);
        expect(cb2).to.have.callCount(count);
        expect(cb3).to.have.callCount(count);
        expect(cb4).to.have.callCount(count);
      };

      const reset = () => {
        cb.reset();
        cb2.reset();
        cb3.reset();
        cb4.reset();
      };

      trigger();
      callCount(3);
      reset();

      remove(window);

      trigger();
      callCount(2);
      reset();

      remove(d);

      trigger();
      callCount(1);
      reset();

      remove(b);

      trigger();
      callCount(0);
    });

    it('Should ignore non bound delegates from an object', () => {
      expect(off(d, 'delegate', '.notbound', () => {})).to.equal(d);
    });

    it('Should remove an given delegate event handler from an object', () => {
      const cb = sinon.spy();

      on(d, 'delegate', 'body', cb);

      $.trigger('delegate', b);
      expect(cb).to.have.been.calledOnce;

      cb.reset();

      off(d, 'delegate', 'body', cb);

      $.trigger('delegate', b);
      expect(cb).to.not.have.been.called;
    });

    it('Should remove all delegate event handlers with a given delegate selector from an object', () => {
      const cb = sinon.spy();
      const cb2 = sinon.spy();
      const cb3 = sinon.spy();

      on(d, 'delegate', cb);
      on(d, 'delegate', 'body', cb2);
      on(d, 'delegate', 'body', cb3);

      $.trigger('delegate', b);

      expect(cb).to.have.been.calledOnce;
      expect(cb2).to.have.been.calledOnce;
      expect(cb3).to.have.been.calledOnce;

      cb.reset();
      cb2.reset();
      cb3.reset();

      off(d, 'delegate', 'body');

      $.trigger('delegate', b);

      expect(cb).to.have.been.calledOnce;
      expect(cb2).to.not.have.been.called;
      expect(cb3).to.not.have.been.called;
    });

    it('Should remove a namespaced event handler from an object', () => {
      const cb = sinon.spy();

      on(b, 'name.space', cb);

      $.trigger('name.space', b);
      $.trigger('name', b);
      $.trigger('space', b);

      expect(cb).to.have.been.calledTwice;

      off(b, 'name.space', cb);

      cb.reset();

      $.trigger('name.space', b);
      $.trigger('name', b);
      $.trigger('space', b);

      expect(cb).to.not.have.been.called;
    });

    it('Should remove multiple event handlers from an object', () => {
      const test = (evts) => {
        const cb = sinon.spy();

        on(b, 'click touch custom', cb);

        $.trigger('click', b);
        $.trigger('touch', b);
        $.trigger('custom', b);

        expect(cb).to.have.been.calledTrice;

        off(b, evts, cb);

        cb.reset();

        $.trigger('click', b);
        $.trigger('touch', b);
        $.trigger('custom', b);

        expect(cb).to.not.have.been.called;
      };

      test('click touch custom');
      test('click, touch, custom');
      test(['click', 'touch', 'custom']);
      test(['click, touch', 'custom']);
      test(['click, touch', null, 'custom']);
    });

    it('Should remove all event handlers of a given event type from an object', () => {
      const cb = sinon.spy();
      const cb2 = sinon.spy();
      const cb3 = sinon.spy();

      on(b, 'test', cb);
      on(b, 'test', cb2);
      on(b, 'test', cb3);

      $.trigger('test', b);

      expect(cb).to.have.been.calledOnce;
      expect(cb2).to.have.been.calledOnce;
      expect(cb3).to.have.been.calledOnce;

      off(b, 'test');

      cb.reset();
      cb2.reset();
      cb3.reset();

      $.trigger('test', b);

      expect(cb).not.to.have.been.called;
      expect(cb2).not.to.have.been.called;
      expect(cb3).not.to.have.been.called;
    });

    it('Should remove all event handlers of multiple event types from an object', () => {
      const cb = sinon.spy();
      const cb2 = sinon.spy();
      const cb3 = sinon.spy();

      const test = (evts) => {
        on(b, 'click touch custom', cb);
        on(b, 'click touch custom', cb2);
        on(b, 'click touch custom', cb3);

        $.trigger('click', b);
        $.trigger('touch', b);
        $.trigger('custom', b);

        expect(cb).to.have.been.callCount(3);
        expect(cb2).to.have.been.callCount(3);
        expect(cb3).to.have.been.callCount(3);

        off(b, evts);

        cb.reset();
        cb2.reset();
        cb3.reset();

        $.trigger('click', b);
        $.trigger('touch', b);
        $.trigger('custom', b);

        expect(cb).not.to.have.been.called;
        expect(cb2).not.to.have.been.called;
        expect(cb3).not.to.have.been.called;
      };

      test('click touch custom');
      test('click, touch, custom');
      test(['click', 'touch', 'custom']);
      test(['click, touch', 'custom']);
      test(['click, touch', null, 'custom']);
    });

    it('Should remove all event handlers from an object', () => {
      const cb = sinon.spy();
      const cb2 = sinon.spy();
      const cb3 = sinon.spy();

      on(b, 'click touch custom', cb);
      on(b, 'click touch custom', cb2);
      on(b, 'click touch custom', cb3);

      $.trigger('click', b);
      $.trigger('touch', b);
      $.trigger('custom', b);

      expect(getEvents(b).size).to.equal(3);

      expect(cb).to.have.been.callCount(3);
      expect(cb2).to.have.been.callCount(3);
      expect(cb3).to.have.been.callCount(3);

      off(b);

      cb.reset();
      cb2.reset();
      cb3.reset();

      $.trigger('click', b);
      $.trigger('touch', b);
      $.trigger('custom', b);

      expect(cb).not.to.have.been.called;
      expect(cb2).not.to.have.been.called;
      expect(cb3).not.to.have.been.called;

      expect(getEvents(b).size).to.equal(0);
    });
  });
});
