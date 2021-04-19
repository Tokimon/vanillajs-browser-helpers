import { appendFrame, createDetachedDocument, createElement } from './assets/helpers';

import isDOMRoot from '../isDOMRoot';



describe('"isDOMRoot"', () => {
  describe('Returns `true` for the `documentElement`', () => {
    const test = (doc: Document) =>
      expect(isDOMRoot(doc.documentElement)).toBe(true);

    it('In the current document', () => {
      test(document);
    });

    it('In a Frame', () => {
      const frame = appendFrame();

      test((frame.contentDocument as Document));

      frame.remove();
    });

    it('A DOM Node in a detached Document', () => {
      test(createDetachedDocument());
    });
  });

  describe('Returns `false` for values that are not `documentElement`:', () => {
    it.each([
      ['Window', window],
      ['Document', document],
      ['<body> element', document.body],
      ['<p> element', createElement('p')],
      ['Text Node', document.createTextNode('')],
      ['Comment Node', document.createComment('')],
      ['Document Fragment', document.createDocumentFragment()],
      ['NULL', null],
      ['Object', {}],
      ['Fake Element', { parentNode: { nodeType: 9 } }]
    ])('%s', (_, val) => {
      expect(isDOMRoot(val)).toBe(false);
    });
  });
});
