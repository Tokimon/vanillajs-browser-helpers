import { bind, unbind } from './assets/helpers';

import trigger from '../trigger';



describe('"Trigger"', () => {
  function suite(elm?: Element | Window) {
    const cb = jest.fn();

    const evt = 'test';
    const evts = [1, 2, 3].map((n) => evt + n);

    const _trigger = (...args: [
      eventNames: string | string[],
      data?: unknown
    ]) => elm ? trigger(elm, ...args) : trigger(...args);

    const target = elm || document;

    beforeEach(() => {
      cb.mockClear();
    });

    it('Returns the given element', () => {
      expect(_trigger(evt)).toBe(target);
    });

    it.each(
      ['', '_', '-', '.', ':']
    )('Triggers event with separator: "%s"', (separator) => {
      const cb = jest.fn();

      let e = 'test';
      if (separator) { e += separator + 'part'; }

      bind(target, e, cb);

      _trigger(e);

      expect(cb).toHaveBeenCalledTimes(1);

      unbind(target, e, cb);
    });

    it('Triggers multiple events', () => {
      const cb = jest.fn();

      evts.forEach((e) => bind(target, e, cb));

      _trigger(evts);

      expect(cb).toHaveBeenCalledTimes(3);

      evts.forEach((e) => unbind(target, e, cb));
    });

    it.each([
      ['Object', { extra: 'test' }],
      ['Function', () => undefined],
      ['String', 'test']
    ])('Triggers given event with extra data: %s', (_, val) => {
      bind(target, evt, cb);

      _trigger(evt, val);

      expect(cb).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: val
        })
      );

      unbind(target, 'test', cb);
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
