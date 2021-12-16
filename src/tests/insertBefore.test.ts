import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

import insertBefore from '../insertBefore';



const testID = generateId('InsertBefore');
const nodeID = generateId('InsertBeforeNode');



describe('"insertBefore"', () => {
  let testNode: HTMLElement;

  beforeAll(() => insertHtml(`<div id="${testID}"></div>`));

  beforeEach(() => {
    byId(testID).innerHTML = `<div id="${nodeID}"></div>`;
    testNode = byId(nodeID);
  });

  afterAll(() => removeElement(testID));

  it('Inserts DOM element after a given DOM element', () => {
    const node = byId(nodeID);
    const div = createElement('div');
    div.className = 'inserted-dom';

    insertBefore(node, div);

    const next = node.previousSibling as Element;
    expect(next.className).toBe('inserted-dom');
  });

  it('Inserts plain HTML after a given DOM element', () => {
    insertBefore(testNode, '<div class="inserted-html"></div>');

    const next = testNode.previousSibling as Element;
    expect(next.className).toBe('inserted-html');
  });

  it('Converts a selector to a DOM element before inserting it after a given DOM element', () => {
    insertBefore(testNode, '.selector-element');

    const next = testNode.previousSibling as Element;
    expect(next.className).toBe('selector-element');
  });

  describe('Returns the inserted DOM element', () => {
    it('HTML node', () => {
      const div = createElement('div');

      const elm = insertBefore(testNode, div);
      expect(elm).toBe(div);
    });

    it('HTML string', () => {
      const elm = insertBefore(testNode, '<div class="inserted-always-html"></div>') as Element;
      expect(elm.className).toBe('inserted-always-html');
    });
  });

  describe('Ignores and return `null` for', () => {
    it('The <HTML> element', () => {
      const htmlElm = document.documentElement;
      const htmlNext = htmlElm.previousSibling;

      expect(insertBefore(htmlElm, createElement('div'))).toBe(null);
      expect(htmlElm.previousSibling).toBe(htmlNext);
    });

    it('DOM elements not inserted into the DOM', () => {
      const div = createElement('div');

      expect(insertBefore(div, createElement('div'))).toBe(null);
      expect(div.previousSibling).toBe(null);
    });
  });
});
