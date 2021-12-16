import { bind, triggerEvent } from './assets/helpers';

import eventOptionsSupported from '../eventOptionsSupported';

import off from '../off';



describe('"off"', () => {
  function suite(elm?: HTMLElement | Window) {
    let spy: jest.SpyInstance;
    const cb = jest.fn();

    const evt = 'test';
    const evts = [1, 2, 3].map((n) => evt + n);

    const _off = (...args: [
      string | string[],
      EventListenerOrEventListenerObject,
      EventListenerOptions?
    ]) => elm ? off(elm, ...args) : off(...args);

    const target = elm || document;

    beforeAll(() => {
      // we need to do the check to get the right number of calls,
      // since the check uses "addEventListener"
      eventOptionsSupported();
      spy = jest.spyOn(elm || document, 'removeEventListener');
    });

    beforeEach(() => {
      spy.mockClear();
      cb.mockClear();
    });

    afterAll(() => spy.mockRestore());

    it.each(
      ['', '_', '-', '.', ':']
    )('Removes event with separator: "%s"', (separator) => {
      let e = evt;
      if (separator) { e += separator + 'part'; }

      _off(e, cb);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Calls "removeEventListener" for each event name in a list', () => {
      _off(evts, cb);

      expect(spy).toHaveBeenCalledTimes(3);
    });

    it('Removes event', () => {
      bind(target, evt, cb);
      triggerEvent(evt, target);

      expect(cb).toHaveBeenCalledTimes(1);

      _off(evt, cb);

      triggerEvent(evt, target);

      expect(cb).toHaveBeenCalledTimes(1);
    });

    describe('When EventTarget is not supported, third argument in "removeEventListener" is', () => {
      beforeEach(() => {
        const supportSpy = jest.spyOn(document, 'addEventListener')
          .mockImplementation(() => { throw new Error('nope'); });

        const supported = eventOptionsSupported(true);
        expect(supported).toBe(false);

        supportSpy.mockRestore();
      });

      afterEach(() => { eventOptionsSupported(true); });

      it('`false` when no options are given', () => {
        _off(evt, cb);

        expect(spy).toHaveBeenCalledWith(evt, cb, false);
      });

      it('`false` when "capture" is falsy', () => {
        _off(evt, cb, { capture: false });

        expect(spy).toHaveBeenCalledWith(evt, cb, false);
      });

      it('`true` when "capture" is true', () => {
        _off(evt, cb, { capture: true });

        expect(spy).toHaveBeenCalledWith(evt, cb, true);
      });
    });
  }

  describe.each([
    ['no Element (falls back to Document)', undefined],
    ['a HTML element', document.body],
    ['Window', window]
  ])('With %s', (_, elm) => {
    suite(elm);
  });
});
