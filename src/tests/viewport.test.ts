import viewport from '../viewport';
import { appendFrame, createDetachedDocument } from './assets/helpers';



describe('"viewport"', () => {
  describe('Returns the <html> element for', () => {
    const docElm = (doc: Document) => doc.documentElement;

    describe.each([
      ['Standard Element', (doc: Document) => doc.createElement('div')],
      ['<body>', (doc: Document) => doc.body],
      ['Document', (doc: Document) => doc],
      ['Window', (doc: Document) => doc.defaultView || window]
    ])('when given element is: %s', (type, getElm) => {
      it('In the current document', () => {
        const doc = document;
        expect(viewport(getElm(doc))).toBe(docElm(doc));
      });

      it('In a Frame document', () => {
        const frame = appendFrame();
        const doc = frame.contentDocument as Document;

        expect(viewport(getElm(doc))).toBe(docElm(doc));

        frame.remove();
      });

      if (type !== 'Window') {
        it('A DOM Node in a detached Document', () => {
          const doc = createDetachedDocument();
          expect(viewport(getElm(doc))).toBe(docElm(doc));
        });
      }
    });

    it('With no given element', () => {
      expect(viewport()).toBe(docElm(document));
    });
  });
});
