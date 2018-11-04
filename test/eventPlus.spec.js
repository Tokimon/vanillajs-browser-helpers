import { expect, helpers, describe, it, spy, stub } from './assets/init-test';

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
      expect(eventListId(null)).to.equal(null);
      expect(eventListId({})).to.equal(null);
      expect(eventListId({ addEventListener() {} })).to.equal(null);
      expect(eventListId({ removeEventListener() {} })).to.equal(null);
      expect(eventListId()).to.equal(null);
    });
  });

  describe('"getEvents"', () => {
    it('Should get list of bound events of an object', () => {
      const cb = () => {};

      const test = (elm) => {
        expect(getEvents(elm)).to.have.property('size', 0);

        on(elm, 'test', cb);

        expect(getEvents(elm)).to.have.property('size', 1);
        expect(getEvents(elm).has('test')).to.equal(true);

        off(elm, 'test', cb);

        expect(getEvents(elm)).to.have.property('size', 0);
        expect(getEvents(elm).has('test')).to.equal(false);
      };

      test(window);
      test(d);
      test(b);
      test(d.createTextNode('TextNode'));
    });

    it('Should ignore objects that are not eligible for an "eventListId"', () => {
      expect(getEvents()).to.equal(null);
      expect(getEvents(null)).to.equal(null);
      expect(getEvents({})).to.equal(null);
      expect(getEvents({ addEventListener() {} })).to.equal(null);
      expect(getEvents({ removeEventListener() {} })).to.equal(null);
    });
  });

  const d = document;
  const b = d.body;

  describe('"on"', () => {
    it('Should fallback to document, if the element is not a DOM Node', () => {
      const cb = spy();

      expect(on('test-undefined', cb)).to.be.equal(d);
      expect(on(null, 'test-null', cb)).to.be.equal(d);
      expect(on({}, 'test-object', cb)).to.be.equal(d);
      expect(on(123, 'test-number', cb)).to.be.equal(d);

      helpers.trigger('test-undefined', d);
      helpers.trigger('test-null', d);
      helpers.trigger('test-object', d);
      helpers.trigger('test-number', d);

      expect(cb).to.have.callCount(4);

      cb.resetHistory();

      off(d);
    });

    it('Should ignore non string/array events argument', () => {
      const cb = spy();

      expect(on(cb)).to.be.equal(d);
      expect(getEvents(d).has(undefined)).to.equal(false);
      expect(getEvents(d).has('undefined')).to.equal(false);

      expect(on(b, cb)).to.be.equal(b);
      expect(on(b, null, cb)).to.be.equal(b);
      expect(on(b, 123, cb)).to.be.equal(b);
      expect(on(b, {}, cb)).to.be.equal(b);

      const evts = getEvents(b);
      expect(evts.has(undefined)).to.equal(false);
      expect(evts.has('undefined')).to.equal(false);
      expect(evts.has(null)).to.equal(false);
      expect(evts.has('null')).to.equal(false);
      expect(evts.has(123)).to.equal(false);
      expect(evts.has('123')).to.equal(false);
      expect(evts.has({})).to.equal(false);
      expect(evts.has('[object Object]')).to.equal(false);
    });

    it('Should ignore non function event handlers', () => {
      expect(on(b, 'nohandler')).to.be.equal(b);
      expect(on(b, 'nohandler', null)).to.be.equal(b);
      expect(on(b, 'nohandler', {})).to.be.equal(b);
      expect(on(b, 'nohandler', 123)).to.be.equal(b);
      expect(on(b, 'nohandler', '.delegation')).to.be.equal(b);

      expect(getEvents(b).has('nohandler')).to.equal(false);
      expect(getEvents(b)).to.have.property('size', 0);
    });

    it('Should bind an event handler to an object', () => {
      const cb = spy();
      const cbWin = spy();

      expect(on(window, 'test', cb)).to.equal(window);

      on(window, 'test_underscore', cbWin);
      on(window, 'test-dash', cbWin);
      on(window, 'test:colon', cbWin);

      helpers.trigger('test', window);
      helpers.trigger('test_underscore', window);
      helpers.trigger('test-dash', window);
      helpers.trigger('test:colon', window);

      expect(cb).to.have.callCount(1);
      expect(cbWin).to.have.callCount(3);

      cb.resetHistory();
      cbWin.resetHistory();

      const cbDoc = spy();

      expect(on(d, 'test', cb)).to.equal(d);

      on(d, 'test_underscore', cbDoc);
      on(d, 'test-dash', cbDoc);
      on(d, 'test:colon', cbDoc);

      helpers.trigger('test', d);
      helpers.trigger('test_underscore', d);
      helpers.trigger('test-dash', d);
      helpers.trigger('test:colon', d);

      expect(cb).to.have.callCount(2);
      expect(cbWin).to.have.callCount(3);
      expect(cbDoc).to.have.callCount(3);

      cb.resetHistory();
      cbWin.resetHistory();
      cbDoc.resetHistory();

      const cbBody = spy();

      expect(on(b, 'test', cb)).to.equal(b);

      on(b, 'test_underscore', cbBody);
      on(b, 'test-dash', cbBody);
      on(b, 'test:colon', cbBody);

      helpers.trigger('test', b);
      helpers.trigger('test_underscore', b);
      helpers.trigger('test-dash', b);
      helpers.trigger('test:colon', b);

      expect(cb).to.have.callCount(3);
      expect(cbWin).to.have.callCount(3);
      expect(cbDoc).to.have.callCount(3);
      expect(cbBody).to.have.callCount(3);

      off(window);
      off(d);
      off(b);
    });

    it('Should bind a delagate event handler to an object', () => {
      const cb = spy();

      on(d, 'delegate', 'body', cb);
      helpers.trigger('delegate', b);
      expect(cb).to.have.callCount(1);

      off(d);
    });

    it('Should bind a namespaced event handler to an object', () => {
      const cb = spy();

      on(b, 'name.space', cb);

      helpers.trigger('name.space', b);
      helpers.trigger('name', b);

      expect(cb).to.have.callCount(2);

      off(b);
    });

    it('Should bind multiple event handlers to an object', () => {
      const cb = spy();
      const cb2 = spy();
      const cb3 = spy();
      const cb4 = spy();
      const cb5 = spy();

      on(b, 'click touch custom', cb);
      on(b, 'click,touch, custom', cb2);
      on(b, ['click touch', 'custom'], cb3);
      on(b, ['click', 'touch', 'custom'], cb4);
      on(b, ['click, touch', null, 'custom'], cb5);

      helpers.trigger('click', b);
      helpers.trigger('touch', b);
      helpers.trigger('custom', b);

      expect(cb).to.have.callCount(3);
      expect(cb2).to.have.callCount(3);
      expect(cb3).to.have.callCount(3);
      expect(cb4).to.have.callCount(3);
      expect(cb5).to.have.callCount(3);

      off(b);
    });

    it('Should not fail if event handlers have been removed', () => {
      const cb = spy();

      on(b, 'disapeared', cb);
      getEvents(b).delete('disapeared');
      helpers.trigger('disapeared', b);

      expect(cb).to.have.callCount(0);

      off(b);
    });

    it('Should stop all subsequent handlers if false is returned from a handler', () => {
      const stopCb = stub();
      const stopCb2 = spy();
      const stopCb3 = spy();

      stopCb.onCall(0).returns(false);

      on(b, 'stop', stopCb);
      on(b, 'stop', stopCb2);
      on(b, 'stop', stopCb3);

      helpers.trigger('stop', b);

      expect(stopCb).to.have.callCount(1);
      expect(stopCb2).to.have.callCount(0);
      expect(stopCb3).to.have.callCount(0);

      off(b);
    });
  });

  describe('"off"', () => {
    it('Should fallback to document, if the element is not a DOM Node', () => {
      const cb = spy();

      on('test-undefined', cb);
      on(null, 'test-null', cb);
      on({}, 'test-object', cb);
      on(123, 'test-number', cb);

      helpers.trigger('test-undefined', d);
      helpers.trigger('test-null', d);
      helpers.trigger('test-object', d);
      helpers.trigger('test-number', d);

      expect(cb).to.have.callCount(4);

      expect(off('test-undefined', cb)).to.be.equal(d);
      expect(off(null, 'test-null', cb)).to.be.equal(d);
      expect(off({}, 'test-object', cb)).to.be.equal(d);
      expect(off(123, 'test-number', cb)).to.be.equal(d);

      cb.resetHistory();

      helpers.trigger('test-undefined', d);
      helpers.trigger('test-null', d);
      helpers.trigger('test-object', d);
      helpers.trigger('test-number', d);

      expect(cb).to.have.callCount(0);
    });

    it('Should remove an given event handler from an object', () => {
      const cb = spy();
      const cb2 = spy();
      const cb3 = spy();
      const cb4 = spy();

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
        helpers.trigger('test', b);
        helpers.trigger('test_underscore', b);
        helpers.trigger('test-dash', b);
        helpers.trigger('test:colon', b);
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
        cb.resetHistory();
        cb2.resetHistory();
        cb3.resetHistory();
        cb4.resetHistory();
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
      const cb = spy();

      on(d, 'delegate', 'body', cb);

      helpers.trigger('delegate', b);
      expect(cb).to.have.callCount(1);

      cb.resetHistory();

      off(d, 'delegate', 'body', cb);

      helpers.trigger('delegate', b);
      expect(cb).to.have.callCount(0);
    });

    it('Should remove all delegate event handlers with a given delegate selector from an object', () => {
      const cb = spy();
      const cb2 = spy();
      const cb3 = spy();

      on(d, 'delegate', cb);
      on(d, 'delegate', 'body', cb2);
      on(d, 'delegate', 'body', cb3);

      helpers.trigger('delegate', b);

      expect(cb).to.have.callCount(1);
      expect(cb2).to.have.callCount(1);
      expect(cb3).to.have.callCount(1);

      cb.resetHistory();
      cb2.resetHistory();
      cb3.resetHistory();

      off(d, 'delegate', 'body');

      helpers.trigger('delegate', b);

      expect(cb).to.have.callCount(1);
      expect(cb2).to.have.callCount(0);
      expect(cb3).to.have.callCount(0);
    });

    it('Should remove a namespaced event handler from an object', () => {
      const cb = spy();

      on(b, 'name.space', cb);

      helpers.trigger('name.space', b);
      helpers.trigger('name', b);
      helpers.trigger('space', b);

      expect(cb).to.have.callCount(2);

      off(b, 'name.space', cb);

      cb.resetHistory();

      helpers.trigger('name.space', b);
      helpers.trigger('name', b);
      helpers.trigger('space', b);

      expect(cb).to.have.callCount(0);
    });

    it('Should remove multiple event handlers from an object', () => {
      const test = (evts) => {
        const cb = spy();

        on(b, 'click touch custom', cb);

        helpers.trigger('click', b);
        helpers.trigger('touch', b);
        helpers.trigger('custom', b);

        expect(cb).to.have.callCount(3);

        off(b, evts, cb);

        cb.resetHistory();

        helpers.trigger('click', b);
        helpers.trigger('touch', b);
        helpers.trigger('custom', b);

        expect(cb).to.have.callCount(0);
      };

      test('click touch custom');
      test('click, touch, custom');
      test(['click', 'touch', 'custom']);
      test(['click, touch', 'custom']);
      test(['click, touch', null, 'custom']);
    });

    it('Should remove all event handlers of a given event type from an object', () => {
      const cb = spy();
      const cb2 = spy();
      const cb3 = spy();

      on(b, 'test', cb);
      on(b, 'test', cb2);
      on(b, 'test', cb3);

      helpers.trigger('test', b);

      expect(cb).to.have.callCount(1);
      expect(cb2).to.have.callCount(1);
      expect(cb3).to.have.callCount(1);

      off(b, 'test');

      cb.resetHistory();
      cb2.resetHistory();
      cb3.resetHistory();

      helpers.trigger('test', b);

      expect(cb).to.have.callCount(0);
      expect(cb2).to.have.callCount(0);
      expect(cb3).to.have.callCount(0);
    });

    it('Should remove all event handlers of multiple event types from an object', () => {
      const cb = spy();
      const cb2 = spy();
      const cb3 = spy();

      const test = (evts) => {
        on(b, 'click touch custom', cb);
        on(b, 'click touch custom', cb2);
        on(b, 'click touch custom', cb3);

        helpers.trigger('click', b);
        helpers.trigger('touch', b);
        helpers.trigger('custom', b);

        expect(cb).to.have.been.callCount(3);
        expect(cb2).to.have.been.callCount(3);
        expect(cb3).to.have.been.callCount(3);

        off(b, evts);

        cb.resetHistory();
        cb2.resetHistory();
        cb3.resetHistory();

        helpers.trigger('click', b);
        helpers.trigger('touch', b);
        helpers.trigger('custom', b);

        expect(cb).to.have.callCount(0);
        expect(cb2).to.have.callCount(0);
        expect(cb3).to.have.callCount(0);
      };

      test('click touch custom');
      test('click, touch, custom');
      test(['click', 'touch', 'custom']);
      test(['click, touch', 'custom']);
      test(['click, touch', null, 'custom']);
    });

    it('Should remove all event handlers from an object', () => {
      const cb = spy();
      const cb2 = spy();
      const cb3 = spy();

      on(b, 'click touch custom', cb);
      on(b, 'click touch custom', cb2);
      on(b, 'click touch custom', cb3);

      helpers.trigger('click', b);
      helpers.trigger('touch', b);
      helpers.trigger('custom', b);

      expect(getEvents(b).size).to.equal(3);

      expect(cb).to.have.been.callCount(3);
      expect(cb2).to.have.been.callCount(3);
      expect(cb3).to.have.been.callCount(3);

      off(b);

      cb.resetHistory();
      cb2.resetHistory();
      cb3.resetHistory();

      helpers.trigger('click', b);
      helpers.trigger('touch', b);
      helpers.trigger('custom', b);

      expect(cb).to.have.callCount(0);
      expect(cb2).to.have.callCount(0);
      expect(cb3).to.have.callCount(0);

      expect(getEvents(b).size).to.equal(0);
    });
  });
});
