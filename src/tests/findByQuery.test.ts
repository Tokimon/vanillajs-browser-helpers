import { byId, insertHtml, removeElement } from './assets/helpers';

import findByQuery from '../findByQuery';



describe('"findByQuery"', () => {
  beforeAll(() => insertHtml(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `));

  afterAll(() => ['Item1', 'Item2'].forEach((id) => removeElement(id)));

  describe('find ALL', () => {
    it('Finds all DOM elements matching a given CSS selector', () => {
      let nodes = findByQuery('#Item2.item');
      expect(nodes).toHaveLength(1);

      expect(nodes[0].id).toBe('Item2');

      nodes = findByQuery('#Item2 .item');
      expect(nodes).toHaveLength(2);

      expect(nodes[1].className).toBe('item child second-child');

      nodes = findByQuery('.item');
      expect(nodes).toHaveLength(4);

      expect(nodes[0].id).toBe('Item1');
    });

    it('Fails on bad queries', () => {
      expect(() => findByQuery(':badquery')).toThrow();
    });

    it('Finds a unique collection of DOM elements from a list of CSS selectors', () => {
      const nodes = findByQuery(['.item', '.item.child']);

      expect(nodes).toHaveLength(4);
      expect(nodes[3].className).toBe('item child second-child');
    });

    it('Finds DOM elements from within a given elm', () => {
      const nodes = findByQuery(byId('Item2'), ['.item.child', '.second-child']);

      expect(nodes).toHaveLength(2);
      expect(nodes[1].className).toBe('item child second-child');
    });
  });

  describe('find FIRST', () => {
    it('Find a DOM element matching a given CSS selector', () => {
      let node = findByQuery('#Item2.item', true) as Element;
      expect(node.id).toBe('Item2');

      node = findByQuery('#Item2 .item', true) as Element;
      expect(node.className).toBe('item child');

      node = findByQuery('.item', true) as Element;
      expect(node.id).toBe('Item1');
    });

    it('Fails on bad queries', () => {
      expect(() => findByQuery(':badquery', true)).toThrow();
    });

    it('Find a DOM element from a list of CSS selectors', () => {
      let node = findByQuery('.item, .item.child', true) as Element;
      expect(node.id).toBe('Item1');

      node = findByQuery(['.item', '.item.child'], true) as Element;
      expect(node.id).toBe('Item1');
    });

    it('Finds a DOM element from within a given elm', () => {
      const node = findByQuery(byId('Item2'), ['.item.child', '.second-child'], true) as Element;
      expect(node.className).toBe('item child');
    });
  });
});
