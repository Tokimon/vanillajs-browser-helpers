import { expect, helpers, describe, it, spy, stub } from './assets/init-test';

import once from '../once';



describe('"once" package', () => {
  describe('Binding the event >', () => {
    beforeEach(() => spy(document, 'addEventListener'));
    afterEach(() => document.addEventListener.restore());

    it('Should return null, and not add event, when no event names were given', () => {
      expect(once()).to.equal(null);
      expect(once(() => {})).to.equal(null);
      expect(once(document, () => {})).to.equal(null);

      expect(document.addEventListener).to.have.callCount(0);
    });

    it('Should return null, and not add event, when no handler was given', () => {
      expect(once('test')).to.equal(null);
      expect(once(document)).to.equal(null);
      expect(once(document, 'test')).to.equal(null);

      expect(document.addEventListener).to.have.callCount(0);
    });

    it('Should return a function, when handler has been bound', () => {
      const handler = once('test', () => {});
      expect(handler).to.be.a('function');
      expect(document.addEventListener).to.have.callCount(1);

      helpers.off(document, 'test', handler);
    });

    it('Should fallback to document, if the element is not a valid EventTarget', () => {
      const cb = () => {};

      const handlers = [
        once(undefined, 'undefined', cb),
        once(null, 'null', cb),
        once({}, 'object', cb),
        once(123, 'number', cb)
      ];

      expect(document.addEventListener).to.have.callCount(4);

      helpers.off(document, 'undefined', handlers[0]);
      helpers.off(document, 'null', handlers[1]);
      helpers.off(document, 'object', handlers[2]);
      helpers.off(document, 'number', handlers[3]);
    });

    it('Should add event with elaborate name', () => {
      const cb = () => {};

      const evts = ['test', 'test_underscore', 'test-dash', 'test.dot', 'test:colon'];
      const handlers = evts.map((evt) => once(document, evt, cb));

      expect(document.addEventListener).to.have.callCount(evts.length);

      evts.forEach((evt, i) => {
        helpers.off(document, evt, handlers[i]);
      });
    });

    describe('Multiple event handlers >', () => {
      it('Should call addEventListener for each event name', () => {
        const cb = once(document, ['test', 'test2', 'test3'], () => {});

        expect(document.addEventListener).to.have.callCount(3);

        helpers.off(document, 'test', cb);
        helpers.off(document, 'test2', cb);
        helpers.off(document, 'test3', cb);
      });

      it('Should filter out non string event names', () => {
        const cb = once(document, ['test', 123, null, undefined], () => {});

        expect(document.addEventListener).to.have.callCount(1);

        helpers.off(document, 'test', cb);
      });
    });
  });



  describe('Triggers only once >', () => {
    it('Should trigger given event only once', () => {
      const cb = spy();
      once(document, 'evt', cb);

      helpers.trigger('evt', document);
      helpers.trigger('evt', document);

      expect(cb).to.have.callCount(1);
    });

    it('Should trigger given event only the first time the "when" option is fulfilleld', () => {
      const cb = spy();
      const condition = stub();

      condition.returns(false);
      condition.onCall(1).returns(true);

      once(document, 'evt', cb, { when: condition });

      helpers.trigger('evt', document);
      expect(cb).to.have.callCount(0);
      expect(condition).to.have.callCount(1);

      helpers.trigger('evt', document);
      expect(cb).to.have.callCount(1);
      expect(condition).to.have.callCount(2);

      helpers.trigger('evt', document);
      expect(cb).to.have.callCount(1);
      expect(condition).to.have.callCount(2);
    });

    it('Should add multiple event handlers to an object that are triggered only once', () => {
      const spy2 = spy();

      once(document, ['click', 'custom'], spy2);

      helpers.trigger('click', document);

      expect(spy2).to.have.callCount(1);

      helpers.trigger('custom', document);

      expect(spy2).to.have.callCount(2);

      helpers.trigger('click', document);
      helpers.trigger('custom', document);

      expect(spy2).to.have.callCount(2);
    });
  });
});
