import { appendFrame, createDetachedDocument } from './assets/helpers';

import isDOMElement from '../isDOMElement';



describe('"isDOMElement"', () => {
  describe('Returns `false` for DOM element:', () => {
    describe.each([
      ['<html> element', (doc: Document) => doc.documentElement],
      ['<body> element', (doc: Document) => doc.body],
      ['<p> element', (doc: Document) => doc.createElement('p')]
    ])('%s', (_, getElm) => {
      it('In the current document', () => {
        expect(isDOMElement(getElm(document))).toBe(true);
      });

      it('In a Frame', () => {
        const frame = appendFrame();

        expect(isDOMElement(getElm((frame.contentDocument as Document)))).toBe(true);

        frame.remove();
      });

      it('A DOM Element in a detached Document', () => {
        const doc = createDetachedDocument();
        expect(isDOMElement(getElm(doc))).toBe(true);
      });
    });
  });

  describe('Returns `false` for non DOM element:', () => {
    it.each([
      ['Document', document],
      ['Fragment', document.createDocumentFragment()],
      ['Text Node', document.createTextNode('')],
      ['Comment Node', document.createComment('')],
      ['Window', window],
      ['NULL', null],
      ['Object', {}]
    ])('%s', (_, elm) => {
      expect(isDOMElement(elm)).toBe(false);
    });
  });

  describe('With a given tag name to match', () => {
    it('Returns `true` when it matches the given tag name', () => {
      expect(isDOMElement(document.body, 'body')).toBe(true);
    });

    it('Returns `false` when it does not match the given tag name', () => {
      expect(isDOMElement(document.body, 'html')).toBe(false);
    });
  });

  describe('With a given list tag names to match', () => {
    it('Returns `true` when it matches the one of the given tag names', () => {
      expect(isDOMElement(document.body, ['body', 'div', 'p'])).toBe(true);
    });

    it('Returns `false` when it does not match one of the given tag names', () => {
      expect(isDOMElement(document.documentElement, ['body', 'div', 'p'])).toBe(false);
    });
  });
});
