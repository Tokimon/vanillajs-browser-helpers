import { triggerEvent } from './assets/helpers';

import eventOptionsSupported from '../eventOptionsSupported';
import once, { OnceEventListenerOptions } from '../once';



describe('"once"', () => {
  function suite(elm?: HTMLElement | Window) {
    const cb = jest.fn();

    const evt = 'test';
    const evts = [1, 2, 3].map((n) => evt + n);

    const _once = (...args: [
      string | string[],
      EventListenerOrEventListenerObject,
      OnceEventListenerOptions?
    ]) => elm ? once(elm, ...args) : once(...args);

    const target = elm || document;

    beforeAll(() => {
      cb.mockReset();
    });

    beforeEach(() => {
      cb.mockReset();
    });

    it('Returns a function that unbinds the event handler', () => {
      const unbind = _once(evt, cb);
      unbind();

      triggerEvent(evt);

      expect(cb).toHaveBeenCalledTimes(0);
    });

    describe('Binds event with "addEventListener"', () => {
      let spy: jest.SpyInstance;

      beforeAll(() => {
        spy = jest.spyOn(target, 'addEventListener');
      });

      beforeEach(() => {
        // we need to do the check to get the right number of calls,
        // since the check uses "addEventListener"
        eventOptionsSupported();
        spy.mockClear();
      });

      afterAll(() => spy.mockRestore());

      it.each(
        ['', '_', '-', '.', ':']
      )('with separator: "%s"', (separator) => {
        let e = evt;
        if (separator) { e += separator + 'part'; }

        const unbind = _once(e, cb);

        expect(spy).toHaveBeenCalledTimes(1);

        unbind();
      });

      it('For each event name in a list', () => {
        const unbind = _once(evts, cb);

        expect(spy).toHaveBeenCalledTimes(3);

        unbind();
      });

      describe('When EventTarget is not supported, third argument in "addEventListener" is', () => {
        const anyFunc = expect.any(Function);
        let supportSpy;

        beforeEach(() => {
          supportSpy = jest.spyOn(document, 'addEventListener')
            .mockImplementation(() => { throw new Error('nope'); });

          const supported = eventOptionsSupported(true);
          expect(supported).toBe(false);

          // Since we are re-mocking the "document.addEventListener" above,
          // we only "reset" when the target is the document, instead of restoring
          target === document
            ? supportSpy.mockReset()
            : supportSpy.mockRestore();
        });

        afterEach(() => {
          eventOptionsSupported(true);
        });

        it('`false` when no options are given', () => {
          const unbind = _once(evt, cb);

          expect(spy).toHaveBeenCalledWith(evt, anyFunc, false);

          unbind();
        });

        it.each([undefined, false])('`false` when "capture" is: %s', (capture) => {
          const unbind = _once(evt, cb, { capture });

          expect(spy).toHaveBeenCalledWith(evt, anyFunc, false);

          unbind();
        });

        it('`true` when "capture" is true', () => {
          const unbind = _once(evt, cb, { capture: true });

          expect(spy).toHaveBeenCalledWith(evt, anyFunc, true);

          unbind();
        });
      });
    });

    describe('Triggers event only once', () => {
      it('Trigger given event only once', () => {
        const unbind = _once(evt, cb);

        triggerEvent(evt, target);
        triggerEvent(evt, target);

        expect(cb).toHaveBeenCalledTimes(1);

        unbind();
      });

      it('Trigger given event the first time the "when" option is fulfilled', () => {
        const when = jest.fn()
          .mockReturnValue(true)
          .mockReturnValueOnce(false);

        const unbind = _once(evt, cb, { when });

        triggerEvent(evt, target);
        expect(cb).toHaveBeenCalledTimes(0);
        expect(when).toHaveBeenCalledTimes(1);

        triggerEvent(evt, target);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(when).toHaveBeenCalledTimes(2);

        triggerEvent(evt, target);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(when).toHaveBeenCalledTimes(2);

        unbind();
      });

      it('Multiple events handlers are triggered only once', () => {
        const unbind = _once(evts, cb);

        evts.forEach((e) => triggerEvent(e, target));

        expect(cb).toHaveBeenCalledTimes(3);
        cb.mockClear();

        evts.forEach((e) => triggerEvent(e, target));

        expect(cb).toHaveBeenCalledTimes(0);

        unbind();
      });
    });
  }

  describe('With no Element given (falls back to Document)', () => {
    suite();
  });

  describe('With a given HTML element', () => {
    suite(document.body);
  });

  describe('With Window', () => {
    suite(window);
  });
});
