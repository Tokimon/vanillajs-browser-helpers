import siblings, { nextSiblings, previousSiblings } from '../siblings';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';



const testID = generateId('Siblings');



describe('"siblings"', () => {
  const nonChildNodes: ([string, Document | Element | null])[] = [
    ['Document', document],
    ['Unappended element', createElement('div')],
    ['null', null]
  ];

  beforeAll(() => insertHtml(
    `<div id="${testID}">
      <span id="FirstChild">
        <b id="LoneChild"></b>
      </span>
      text
      <br>
      <!-- Comment -->
      <i></i>
      <b></b>
      <span id="NoChild"></span>
      <div></div>
      <input>
      <button></button>
      <span id="LastChild"></span>
    </div>`
  ));

  afterAll(() => removeElement(testID));

  describe('.siblings', () => {
    it('Returns an array of siblings of the element', () => {
      const elm = byId('NoChild');
      const elms = siblings(elm);

      expect(elms).toHaveLength(8);
      expect(elms.every((node) => node !== elm)).toBe(true);
    });

    describe('Returns an empty array when', () => {
      it.each(nonChildNodes)('The given node is not a child in the DOM: %s', (_, elm) => {
        expect(siblings(elm)).toHaveLength(0);
      });

      it('The element has no siblings', () => {
        const elm = byId('LoneChild');
        const elms = siblings(elm);

        expect(elms).toHaveLength(0);
      });
    });
  });

  describe('.previousSiblings', () => {
    it('Returns an array of all siblings before the given element', () => {
      const elm = byId('NoChild');
      const elms = previousSiblings(elm);

      expect(elms).toHaveLength(4);
      expect(elms.every((node) => node !== elm)).toBe(true);
    });

    describe('Returns an empty array when', () => {
      it.each(nonChildNodes)('The given node is not a child in the DOM: %s', (_, elm) => {
        expect(previousSiblings(elm)).toHaveLength(0);
      });

      it('The element has no siblings', () => {
        const elm = byId('LoneChild');
        const elms = previousSiblings(elm);

        expect(elms).toHaveLength(0);
      });
    });
  });

  describe('.nextSiblings', () => {
    it('Returns an array of all siblings after the given element', () => {
      const elm = byId('NoChild');
      const elms = nextSiblings(elm);

      expect(elms).toHaveLength(4);
      expect(elms.every((node) => node !== elm)).toBe(true);
    });

    describe('Returns an empty array when', () => {
      it.each(nonChildNodes)('The given node is not a child in the DOM: %s', (_, elm) => {
        expect(nextSiblings(elm)).toHaveLength(0);
      });

      it('The element has no siblings', () => {
        const elm = byId('LoneChild');
        const elms = nextSiblings(elm);

        expect(elms).toHaveLength(0);
      });
    });
  });
});
