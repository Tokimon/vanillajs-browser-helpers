import { unbind } from './assets/helpers';

import eventOptionsSupported from '../eventOptionsSupported';
import on from '../on';



describe('"on"', () => {
  function suite(elm?: HTMLElement | Window) {
    let spy: jest.SpyInstance;
    const cb = jest.fn();

    const evt = 'test';
    const evts = [1, 2, 3].map((n) => evt + n);

    const _on = (...args: [
      string | string[],
      EventListenerOrEventListenerObject,
      EventListenerOptions?
    ]) => elm ? on(elm, ...args) : on(...args);

    const target = elm || document;

    beforeAll(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      eventOptionsSupported();
      spy = jest.spyOn(target, 'addEventListener');
    });

    beforeEach(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      eventOptionsSupported();
      spy.mockClear();
      cb.mockClear();
    });

    afterAll(() => spy.mockRestore());

    it.each(
      ['', '_', '-', '.', ':']
    )('Adds event with separator: "%s"', (separator) => {
      let e = evt;
      if (separator) { e += separator + 'part'; }

      _on(e, cb);

      expect(spy).toHaveBeenCalledTimes(1);

      unbind(target, e, cb);
    });

    it('Calls "addEventListener" for each event name in a list', () => {
      _on(evts, cb);

      expect(spy).toHaveBeenCalledTimes(3);

      evts.forEach((e) => unbind(target, e, cb));
    });

    describe('When EventTarget is not supported, third argument in "addEventListener" is', () => {
      beforeEach(() => {
        const supportSpy = jest.spyOn(document, 'addEventListener')
          .mockImplementation(() => { throw new Error('nope'); });

        const supported = eventOptionsSupported(true);
        expect(supported).toBe(false);

        // Since we are re-mocking the "document.addEventListener" above,
        // we only "reset" when the target is the document, instead of restoring
        target === document
          ? supportSpy.mockReset()
          : supportSpy.mockRestore();
      });

      afterEach(() => { eventOptionsSupported(true); });

      it('`false` when no options are given', () => {
        _on(evt, cb);

        expect(spy).toHaveBeenCalledWith(evt, cb, false);

        unbind(target, evt, cb);
      });

      it('`false` when "capture" is falsy', () => {
        _on(evt, cb, { capture: false });

        expect(spy).toHaveBeenCalledWith(evt, cb, false);

        unbind(target, evt, cb);
      });

      it('`true` when "capture" is true', () => {
        _on(evt, cb, { capture: true });

        expect(spy).toHaveBeenCalledWith(evt, cb, true);

        unbind(target, evt, cb);
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
