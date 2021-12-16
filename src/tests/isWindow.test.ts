import { appendFrame, createDetachedDocument } from './assets/helpers';

import isWindow from '../isWindow';



describe('"isWindow"', () => {
  describe('Returns `true` for:', () => {
    it('The Window', () => {
      expect(isWindow(window)).toBe(true);
    });

    it('The Window of a Frame', () => {
      const frame = appendFrame();

      expect(isWindow(frame.contentWindow)).toBe(true);

      frame.remove();
    });
  });

  describe('Returns `false` for:', () => {
    it('A Frame element', () => {
      const frame = appendFrame();

      expect(isWindow(frame)).toBe(false);

      frame.remove();
    });

    it('The `defaultView` of a detached document', () => {
      const doc = createDetachedDocument();
      expect(isWindow(doc.defaultView)).toBe(false);
    });

    it.each([
      ['Document', document],
      ['<html> element', document.documentElement],
      ['<body> element', document.body],
      ['NULL', null],
      ['Object', {}]
    ])('A non window element: %s', (_, elm) => {
      expect(isWindow(elm)).toBe(false);
    });
  });
});
