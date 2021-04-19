import { insertHtml, removeElement, generateId, byId } from './assets/helpers';

import css from '../css';



const testID = generateId('CSS');
const styleID = generateId('CSS_style');



describe('"css"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`
      <style id="${styleID}">
        #${testID} { overflow: hidden; font-size: 15px; line-height: 1.5; }
        #${testID}:after { content: 'after'; }
      </style>
      <div id="${testID}"></div>
    `);

    testNode = byId(testID);
  });

  beforeEach(() => testNode.removeAttribute('style'));

  afterAll(() => {
    removeElement(testID);
    removeElement(styleID);
  });

  it('Reads the current style of a DOM element', () => {
    const styling = css(testNode);
    expect(styling.overflow).toBe('hidden');
  });

  describe('With `property name` given', () => {
    it('Gets the value of the given style property', () => {
      expect(css(testNode, 'overflow')).toBe('hidden');
    });

    it('Converts numeric values to Number', () => {
      expect(css(testNode, 'lineHeight')).toBe(1.5);
    });

    it('Converts `px` values to Number', () => {
      expect(css(testNode, 'fontSize')).toBe(15);
    });

    describe('And `value`', () => {
      it('Returns the newly set value', () => {
        const value = '20px';
        const result = css(testNode, 'fontSize', value);
        expect(result).toBe(20);
      });

      it('Applies the value to the property as inline style', () => {
        css(testNode, 'fontSize', '20px');
        expect(testNode.style.cssText).toBe('font-size: 20px;');
      });

      it('Applies `px` to numeric values for properties that need units', () => {
        css(testNode, 'fontSize', 20);
        expect(testNode.style.fontSize).toBe('20px');
      });

      it('Does not apply `px` to numeric values for properties that does not need units', () => {
        css(testNode, 'lineHeight', 2);
        expect(testNode.style.lineHeight).toBe('2');
      });

      it('When value includes `!important` it is taken into account', () => {
        css(testNode, 'fontSize', '20em !important');
        expect(testNode.style.cssText).toBe('font-size: 20em !important;');
      });
    });
  });

  describe('With `property mapping` given', () => {
    it('Applies the value to the property as inline style', () => {
      css(testNode, { fontSize: '20px' });
      expect(testNode.style.cssText).toBe('font-size: 20px;');
    });

    it('Applies `px` to numeric values for properties that need units', () => {
      css(testNode, { fontSize: 20 });
      expect(testNode.style.fontSize).toBe('20px');
    });

    it('Does not apply `px` to numeric values for properties that does not need units', () => {
      css(testNode, { lineHeight: 2 });
      expect(testNode.style.lineHeight).toBe('2');
    });

    it('When value includes `!important` it is taken into account', () => {
      css(testNode, { fontSize: '20em !important' });
      expect(testNode.style.cssText).toBe('font-size: 20em !important;');
    });

    it('Applies every property in the given mapping', () => {
      css(testNode, { fontSize: '20em !important', color: 'blue', border: '1px solid green' });
      expect(testNode.style.cssText).toBe('font-size: 20em !important; color: blue; border: 1px solid green;');
    });
  });
});
