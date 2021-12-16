import { insertHtml, byId, removeElement, createElement, generateId } from './assets/helpers';

import addClass from '../addClass';



const testID = generateId('AddClass');



describe('"addClass"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => { testNode.className = ''; });

  afterAll(() => removeElement(testID));

  it('Adds a given CSS class to a DOM element', () => {
    expect(testNode.className).toBe('');
    addClass(testNode, 'inserted');
    expect(testNode.className).toBe('inserted');
  });

  it('Does not add a given CSS class twice to a DOM element', () => {
    testNode.className = 'inserted';

    expect(testNode.className).toBe('inserted');
    addClass(testNode, 'inserted');
    expect(testNode.className).toBe('inserted');
  });

  it('Returns the given element', () => {
    const div = createElement('div');
    expect(addClass(div, 'inserted')).toBe(div);
  });

  describe('Multiple class names', () => {
    it('Adds several CSS classes to a DOM element', () => {
      testNode.className = '';

      addClass(testNode, ['inserted', 'added', 'class3']);
      expect(testNode.className).toBe('inserted added class3');
    });

    it('Only adds unset CSS classes to a DOM element', () => {
      testNode.className = 'inserted class3';

      addClass(testNode, ['inserted', 'added', 'class3']);
      expect(testNode.className).toBe('inserted class3 added');
    });
  });
});
