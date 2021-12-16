import { appendFrame, createDetachedDocument } from './assets/helpers';

import isDocument from '../isDocument';



describe('"isDocument"', () => {
  describe('Returns `true` for', () => {
    it('Document node', () => {
      expect(isDocument(document)).toBe(true);
    });

    it('Document node of a Frame', () => {
      const frame = appendFrame();

      expect(isDocument(frame.contentDocument)).toBe(true);

      frame.remove();
    });

    it('A detached Document', () => {
      expect(isDocument(createDetachedDocument())).toBe(true);
    });
  });

  describe('Returns `false` for non Document node', () => {
    it.each([
      ['<html> element', document.documentElement],
      ['<body> element', document.body],
      ['Window', window],
      ['NULL', null],
      ['Object', {}]
    ])('%s', (_, elm) => {
      expect(isDocument(elm)).toBe(false);
    });
  });
});
