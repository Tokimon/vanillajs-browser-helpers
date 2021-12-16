import { appendFrame, createDetachedDocument, createElement } from './assets/helpers';

import inDOM from '../inDOM';



describe('"inDOM"', () => {
  describe('Returns `true` for DOM elements found in the DOM tree', () => {
    function suite(doc: Document) {
      it('<html> element', () => {
        expect(inDOM(doc.documentElement)).toBe(true);
      });

      it('<body> element', () => {
        expect(inDOM(doc.body)).toBe(true);
      });

      it('Any HTML element', () => {
        const p = doc.createElement('p');
        p.style.cssText = `
          width: 0;
          height: 0;
          position: absolute;
          margin: 0;
          padding: 0;
          opacity: 0;
          overflow: hidden;
        `;

        doc.body.appendChild(p);

        expect(inDOM(p)).toBe(true);

        doc.body.removeChild(p);
      });
    }

    describe('In the current document', () => {
      suite(document);
    });

    describe('In a Frame document', () => {
      const frame = appendFrame();

      suite(frame.contentDocument as Document);

      frame.remove();
    });

    describe('A DOM Node in a detached Document', () => {
      suite(createDetachedDocument());
    });
  });

  describe('Returns `false` for DOM elements not in the DOM tree', () => {
    it('Document', () => {
      expect(inDOM(document)).toBe(false);
    });

    it('HTML element not appended to the DOM', () => {
      expect(inDOM(createElement('p'))).toBe(false);
    });
  });
});
