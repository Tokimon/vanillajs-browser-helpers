import { appendFrame, createDetachedDocument, createElement } from './assets/helpers';

import getCurrentDocument from '../getCurrentDocument';



describe('"getCurrentDocument"', () => {
  it('Returns current Document from a given Frame (not `contentDocument`)', () => {
    const frame = appendFrame();

    const doc = getCurrentDocument(frame);
    expect(doc).toBe(document);

    frame.remove();
  });

  describe('Returns `null` when given value is', () => {
    it.each([
      undefined,
      null,
      {},
      [],
      true,
      'String'
    ])('Not a DOM Node: %s', (value) => {
      const doc = getCurrentDocument(value);
      expect(doc).toBeNull();
    });
  });

  describe('Returns given Document', () => {
    it('Current Document', () => {
      const doc = getCurrentDocument(document);
      expect(doc).toBe(document);
    });

    it('Frame Document', () => {
      const frame = appendFrame();
      const frameDoc = frame.contentDocument;

      const doc = getCurrentDocument(frameDoc);
      expect(doc).toBe(frameDoc);

      frame.remove();
    });

    it('A detached Document', () => {
      const currDoc = createDetachedDocument();

      const doc = getCurrentDocument(currDoc);
      expect(doc).toBe(currDoc);
    });
  });

  describe('Returns the Document of given Window', () => {
    it('Current Window', () => {
      const doc = getCurrentDocument(window);
      expect(doc).toBe(window.document);
    });

    it('Frame Window', () => {
      const frame = appendFrame();

      const doc = getCurrentDocument(frame.contentWindow);
      expect(doc).toBe(frame.contentDocument);

      frame.remove();
    });
  });

  describe('Returns `ownerDocument` of given Node', () => {
    it('From the current Document', () => {
      const div = createElement('div');

      const doc = getCurrentDocument(div);
      expect(doc).toBe(document);
    });

    it('From a detached Document', () => {
      const detachedDoc = createDetachedDocument();
      const div = detachedDoc.createElement('div');

      const doc = getCurrentDocument(div);
      expect(doc).toBe(detachedDoc);
    });

    it('From Frame Document', () => {
      const frame = appendFrame();
      const frameDoc = frame.contentDocument as Document;
      const div = frameDoc.createElement('div');

      const doc = getCurrentDocument(div);
      expect(doc).toBe(frameDoc);

      frame.remove();
    });
  });
});
