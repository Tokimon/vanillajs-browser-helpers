import { byId, createElement, appendFrame, generateId, insertHtml, removeElement, createDetachedDocument } from './assets/helpers';

import isDOMChildNode from '../isDOMChildNode';



const testID = generateId('IsDOMChildNode');



describe('"isDOMChildNode"', () => {
  beforeAll(() => insertHtml(`
    <div id="${testID}">
      <span></span>
    </div>
  `));

  afterAll(() => removeElement(testID));

  describe('Returns `true` for', () => {
    it('DOM nodes in the DOM below the DOM root element', () => {
      expect(isDOMChildNode(document.body)).toBe(true);
      expect(isDOMChildNode(byId(testID).firstChild as Node)).toBe(true);
    });

    it('Child DOM nodes of a DOM element not in the DOM', () => {
      const div = createElement('div');
      div.innerHTML = '<b></b>\ntext';
      const first = div.firstChild as Node;

      expect(isDOMChildNode(first)).toBe(true);
      expect(isDOMChildNode(first.nextSibling as Node)).toBe(true);
    });

    it('DOM nodes in a Frame', () => {
      const frame = appendFrame();

      expect(isDOMChildNode((frame.contentDocument as Document).body)).toBe(true);

      frame.remove();
    });

    it('DOM nodes from a detached document', () => {
      expect(isDOMChildNode(createDetachedDocument().body)).toBe(true);
    });
  });

  describe('Returns `false` for', () => {
    it('DOM nodes not in the DOM', () => {
      const div = createElement('div');
      expect(isDOMChildNode(div)).toBe(false);
    });

    it.each([
      ['Document', document],
      ['<html> element', document.documentElement]
    ])('DOM root elements', (_, elm) => {
      expect(isDOMChildNode(elm)).toBe(false);
    });
  });
});
