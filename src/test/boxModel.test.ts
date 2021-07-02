import { insertHtml, removeElement, byId, generateId } from './assets/helpers';

import boxModel from '../boxModel';



const testID = generateId('BoxModel');
const styleID = generateId('BoxModelStyle');



describe('"boxModel"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`
      <style id='${styleID}'>
        #${testID} {
          margin: 1px 2px 3px 4px;
          padding: 5px 6px 7px 8px;
          border: 13px solid black;
          border-width: 9px 10px 11px 12px;
        }
      </style>
    `);

    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  afterAll(() => {
    removeElement(styleID);
    removeElement(testID);
  });

  describe.each([
    ['margin', 'marginLeft', [1, 2, 3, 4]] as const,
    ['padding', 'paddingLeft', [5, 6, 7, 8]] as const,
    ['border', 'borderLeftWidth', [9, 10, 11, 12]] as const
  ])('Correctly retrieves the "%s" information of the given element', (prop, overrideProp, n) => {
    beforeEach(() => {
      testNode.style.cssText = '';
    });

    it('When reading styles given by stylesheet', () => {
      const bm = boxModel(testNode);
      expect(bm[prop]).toEqual({ top: n[0], right: n[1], bottom: n[2], left: n[3] });
    });

    it('When a inline style override has been set', () => {
      testNode.style[overrideProp] = '40px';
      const bm = boxModel(testNode);

      expect(bm[prop]).toEqual({ top: n[0], right: n[1], bottom: n[2], left: 40 });
    });
  });
});
