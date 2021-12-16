import { appendFrame, createDetachedDocument } from './assets/helpers';

import isDOMNode from '../isDOMNode';



describe('"isDOMNode"', () => {
  describe('Returns `true` for', () => {
    describe.each([
      ['Document Fragment', (doc: Document) => doc.createDocumentFragment()],
      ['Document', (doc: Document) => doc],
      ['<html> element', (doc: Document) => doc.documentElement],
      ['<body> element', (doc: Document) => doc.body],
      ['<p> element', (doc: Document) => doc.createElement('p')],
      ['Text Node', (doc: Document) => doc.createTextNode('')],
      ['Comment Node', (doc: Document) => doc.createComment('')]
    ])('%s', (_, getElm) => {
      it('In the current document', () => {
        expect(isDOMNode(getElm(document))).toBe(true);
      });

      it('In a Frame document', () => {
        const frame = appendFrame();

        expect(isDOMNode(getElm((frame.contentDocument as Document)))).toBe(true);

        frame.remove();
      });

      it('A DOM Node in a detached Document', () => {
        const doc = createDetachedDocument();
        expect(isDOMNode(getElm(doc))).toBe(true);
      });
    });
  });

  describe('Returns `false` for', () => {
    it.each([
      ['Window', window],
      ['NULL', null],
      ['Object', {}]
    ])('%s', (_, elm) => {
      expect(isDOMNode(elm)).toBe(false);
    });
  });
});
