import { byId, insertHtml, removeElement, generateId } from './assets/helpers';

import attr from '../attr';



const testID = generateId('Attr');



describe('"attr"', () => {
  let testNode: HTMLElement;

  const attrs = {
    normal: ['title', 'title attribute'] as const,
    custom: ['custom', 'custom attribute'] as const,
    data: ['data-attr', 'data attribute'] as const
  };

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => {
    testNode.setAttribute(...attrs.normal);
    testNode.setAttribute(...attrs.custom);
    testNode.setAttribute(...attrs.data);
  });

  afterAll(() => removeElement(testID));

  it.each([
    ['normal', ...attrs.normal],
    ['custom', ...attrs.custom],
    ['data', ...attrs.data]
  ])('Retrieves the value of a "%s" attribute on a DOM element', (_, key, value) => {
    expect(attr(testNode, key)).toBe(value);
  });

  describe.each([
    ['normal', ...attrs.normal],
    ['custom', ...attrs.custom],
    ['data', ...attrs.data]
  ])('Setting the value of a "%s" attribute on a DOM element', (_, key, value) => {
    beforeEach(() => { testNode.setAttribute(key, value); });

    it('Sets the new value', () => {
      attr(testNode, key, 'new value');
      expect(testNode.getAttribute(key)).toBe('new value');
    });

    it('Returns the old value', () => {
      expect(attr(testNode, key, 'new value')).toBe(value);
    });
  });

  describe('Boolean values', () => {
    it('Sets an empty attribute on a DOM element when value is true', () => {
      attr(testNode, 'boolean', true);
      expect(testNode.getAttribute('boolean')).toBe('');
    });

    it('Removes the attribute from a DOM element when value is false', () => {
      const initialValue = 'To Remove';
      testNode.setAttribute('toremove', initialValue);

      expect(testNode.getAttribute('toremove')).toBe(initialValue);

      const oldValue = attr(testNode, 'toremove', false);

      expect(oldValue).toBe(initialValue);
      expect(testNode.getAttribute('toremove')).toBeNull();
    });
  });
});
