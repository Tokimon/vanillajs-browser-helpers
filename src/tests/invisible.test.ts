import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

import invisible from '../invisible';



const testID = generateId('Invisible');

const sizeStyle = 'width: 10px; height: 10px;';
const visibleStyle = `${sizeStyle} opacity: 1;`;



describe('"invisible"', () => {
  beforeAll(() => insertHtml(`
    <div id="${testID}" style="${visibleStyle}">
      <style id="Style">
        #NoDisplay { display: none; }
        #NotVisible { visibility: hidden; }
        #Collapsed { overflow: hidden; }
        #Transparent { opacity: 0; }
      </style>
      
      <div id="NoDisplay"><div id="ChildDisplay"></div></div>
      <div id="NotVisible" style="${visibleStyle}"><div id="ChildVisibility"></div></div>
      <div id="Collapsed" style="width: 10px;"><div id="ChildCollapsed"></div></div>
      <div id="Transparent" style="${sizeStyle}"><div id="ChildTransparent"></div></div>
      <div id="Visible" style="${visibleStyle}"></div>
    </div>
  `));

  afterAll(() => removeElement(testID));

  describe('Returns `true` when', () => {
    it('DOM element is "display: none"', () => {
      const node = byId('NoDisplay');
      expect(invisible(node)).toBe(true);
    });

    it('DOM element is a child of an element that is "display: none"', () => {
      const node = byId('ChildDisplay');
      expect(invisible(node)).toBe(true);
    });

    it('DOM element is "visibility: hidden"', () => {
      const node = byId('NotVisible');
      expect(invisible(node)).toBe(true);
    });

    it('DOM element is a child of an element that is "visibility: hidden"', () => {
      const node = byId('ChildVisibility');
      expect(invisible(node)).toBe(true);
    });

    it('DOM element is Collapsed', () => {
      const node = byId('Collapsed');
      expect(invisible(node)).toBe(true);
    });

    it('DOM element is a child of an element that is Collapsed', () => {
      const node = byId('Collapsed');
      const first = node.firstElementChild as HTMLElement;
      expect(invisible(first)).toBe(true);
    });

    it('DOM element is Transparent', () => {
      const node = byId('Transparent');
      expect(invisible(node)).toBe(true);
    });

    it('DOM element is a child of an element that is Transparent', () => {
      const node = byId('Transparent');
      const first = node.firstElementChild as HTMLElement;
      expect(invisible(first)).toBe(true);
    });

    it('DOM element is not in the DOM', () => {
      const node = createElement('div');
      expect(invisible(node)).toBe(true);
    });

    it('DOM element is a child of an element that is not in the DOM', () => {
      const node = createElement('div');
      node.innerHTML = '<p></p>';
      const first = node.firstElementChild as HTMLElement;
      expect(invisible(first)).toBe(true);
    });
  });

  describe('Returns `false` when ', () => {
    it('DOM element is in the DOM and is not styled invisible', () => {
      const node = byId('Visible');
      expect(invisible(node)).toBe(false);
    });
  });
});
