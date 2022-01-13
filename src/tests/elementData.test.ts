import { insertHtml, removeElement, byId, generateId } from './assets/helpers';

import elementData, { resetCache } from '../elementData';



const testID = generateId('ElementData');



describe('"elementData"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => resetCache());

  afterAll(() => removeElement(testNode));

  it('Returns an object with all data stored for the given element, when no key is given', () => {
    elementData(testNode, 'string', 'data');
    elementData(testNode, 'number', 1);
    elementData(testNode, 'boolean', true);
    elementData(testNode, 'object', { a: 1 });
    elementData(testNode, 'array', [1]);
    elementData(testNode, 'null', null);

    expect(elementData(testNode)).toEqual({
      string: 'data',
      number: 1,
      boolean: true,
      object: { a: 1 },
      array: [1],
      null: null
    });
  });

  describe('Stores given data under the given key for a given element', () => {
    it.each([
      null,
      { a: 1 },
      [1],
      'string',
      1,
      true
    ])('data: %s', (data) => {
      elementData(testNode, 'key', data);
      expect(elementData(testNode, 'key')).toBe(data);
    });
  });

  describe('Returns undefined when', () => {
    it('No data is stored for the given element', () => {
      expect(elementData(testNode)).toBeUndefined();
    });

    it('No data is stored for the given element, under the given key', () => {
      expect(elementData(testNode, 'key')).toBeUndefined();
    });
  });
});
