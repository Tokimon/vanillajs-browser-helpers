import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

import findByTagName from '../findByTagName';



const testID = generateId('FindByTagName');



describe('"findByTagName"', () => {
  beforeAll(() => insertHtml(`
    <div id="${testID}">
      <div></div>
      <div></div>
      <div></div>
      <span></span>
    </div>
  `));

  afterAll(() => removeElement(testID));

  describe('Finds DOM elements matching a given tag name', () => {
    it('Globally', () => {
      const nodes = findByTagName('div');

      expect(nodes).toHaveLength(4);
      expect(nodes.every((node) => node.nodeName === 'DIV')).toBe(true);
    });

    it('From within a given element', () => {
      const nodes = findByTagName(byId(testID), 'div');

      expect(nodes).toHaveLength(3);
      expect(nodes.every((node) => node.nodeName === 'DIV')).toBe(true);
    });
  });

  describe('Finds a unique collection of DOM elements matching a list of tag names', () => {
    it('Globally', () => {
      const nodes = findByTagName(['div', 'span']);

      expect(nodes).toHaveLength(5);
      expect(nodes[4].nodeName).toBe('SPAN');
    });

    it('From within a given element', () => {
      const nodes = findByTagName(byId(testID), ['div', 'span']);

      expect(nodes).toHaveLength(4);
      expect(nodes[3].nodeName).toBe('SPAN');
    });
  });
});
