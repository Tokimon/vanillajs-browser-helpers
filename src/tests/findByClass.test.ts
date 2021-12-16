import { insertHtml, removeElement, byId } from './assets/helpers';

import findByClass from '../findByClass';



describe('"findByClass"', () => {
  beforeAll(() => insertHtml(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `));

  afterAll(() => ['Item1', 'Item2'].forEach((id) => removeElement(id)));

  it('Finds DOM elements with a given class name', () => {
    const nodes = findByClass('item');

    expect(nodes).toHaveLength(4);
    expect(nodes[1].id).toBe('Item2');
  });

  it('Finds DOM elements with all given class names', () => {
    const nodes = findByClass('item child');

    expect(nodes).toHaveLength(2);
    expect(nodes[1].className).toBe('item child second-child');
  });

  describe('With multiple queries', () => {
    it('Finds a unique DOM element collection from a list of classnames', () => {
      const nodes = findByClass(['item', 'item child']);

      expect(nodes).toHaveLength(4);
      expect(nodes[3].className).toBe('item child second-child');
    });
  });

  describe('With defined elm', () => {
    it('Find DOM elements matching given class names starting from the given DOM element elm', () => {
      const nodes = findByClass(byId('Item2') as Element, ['item child', 'second-child']);

      expect(nodes).toHaveLength(2);
      expect(nodes[1].className).toBe('item child second-child');
    });
  });
});
