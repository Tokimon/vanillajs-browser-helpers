import { appendFrame, createDetachedDocument } from './assets/helpers';

import isDOMContainer from '../isDOMContainer';



describe('"isDOMContainer"', () => {
  describe('Returns `true` for', () => {
    describe.each([
      ['<html> element', (doc: Document) => doc.documentElement],
      ['<body> element', (doc: Document) => doc.body],
      ['<p> element', (doc: Document) => doc.createElement('p')],
      ['Fragment', (doc: Document) => doc.createDocumentFragment()]
    ])('%s', (_, getElm) => {
      it('In the current document', () => {
        expect(isDOMContainer(getElm(document))).toBe(true);
      });

      it('In a Frame', () => {
        const frame = appendFrame();

        expect(isDOMContainer(getElm((frame.contentDocument as Document)))).toBe(true);

        frame.remove();
      });

      it('A DOM Node in a detached Document', () => {
        const doc = createDetachedDocument();
        expect(isDOMContainer(getElm(doc))).toBe(true);
      });
    });
  });

  describe('Returns `false` for', () => {
    it.each([
      ['Document', document],
      ['Comment Node', document.createComment('')],
      ['Text Node', document.createTextNode('')],
      ['Window', window],
      ['NULL', null],
      ['Object', {}]
    ])('%s', (_, elm) => {
      expect(isDOMContainer(elm)).toBe(false);
    });
  });
});
