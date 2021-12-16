import { appendFrame, createDetachedDocument, createElement } from './assets/helpers';

import getCurrentWindow from '../getCurrentWindow';



describe('"getCurrentWindow"', () => {
  it('Returns current Window from a given Frame (not `contentWindow`)', () => {
    const frame = appendFrame();

    const doc = getCurrentWindow(frame);
    expect(doc).toBe(window);

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
      const doc = getCurrentWindow(value);
      expect(doc).toBeNull();
    });

    it('A detached document', () => {
      const doc = createDetachedDocument();
      const win = getCurrentWindow(doc);

      expect(win).toBeNull();
    });

    it('Node of a detached document', () => {
      const doc = createDetachedDocument();
      const div = doc.createElement('div');

      const win = getCurrentWindow(div);
      expect(win).toBeNull();
    });
  });

  describe('Returns given Window', () => {
    it('Current Window', () => {
      const win = getCurrentWindow(window);
      expect(win).toBe(window);
    });

    it('Frame Window', () => {
      const frame = appendFrame();
      const frameWin = frame.contentWindow;

      const win = getCurrentWindow(frameWin);
      expect(win).toBe(frameWin);

      frame.remove();
    });
  });

  describe('Returns the Window of given Document', () => {
    it('Current Document', () => {
      const doc = getCurrentWindow(document);
      expect(doc).toBe(window);
    });

    it('Frame Document', () => {
      const frame = appendFrame();

      const win = getCurrentWindow(frame.contentDocument);
      expect(win).toBe(frame.contentWindow);

      frame.remove();
    });
  });

  describe('Returns Window of given Node', () => {
    it('From the current Document', () => {
      const div = createElement('div');

      const doc = getCurrentWindow(div);
      expect(doc).toBe(window);
    });

    it('From Frame Document', () => {
      const frame = appendFrame();
      const frameDoc = frame.contentDocument as Document;
      const frameWin = frame.contentWindow;
      const div = frameDoc.createElement('div');

      const doc = getCurrentWindow(div);
      expect(doc).toBe(frameWin);

      frame.remove();
    });
  });
});
