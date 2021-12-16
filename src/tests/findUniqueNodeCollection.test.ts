import { insertHtml, byId, removeElement, createElement, generateId } from './assets/helpers';

import findUniqueNodeCollection from '../findUniqueNodeCollection';



const testID = generateId('AddClass');



describe('"findUniqueNodeCollection"', () => {
  const find = (cn: string) => document.getElementsByClassName(cn);

  beforeAll(() => insertHtml(`
    <div id="${testID}">
      <div class="one item" />
      <div class="two item special" />
      <div class="three item" />
      <div class="four item" />
      <div class="five special" />
      <div class="six item special" />
    </div>
  `));

  afterAll(() => removeElement(testID));

  it('Finds unique element list from given selector', () => {
    const nodes = findUniqueNodeCollection('special', find);

    expect(nodes.map((n) => n.className)).toEqual([
      'two item special',
      'five special',
      'six item special'
    ]);
  });

  it('Finds unique element list from given list of selectors', () => {
    const nodes = findUniqueNodeCollection(['item', 'special'], find);

    expect(nodes.map((n) => n.className)).toEqual([
      'one item',
      'two item special',
      'three item',
      'four item',
      'six item special',
      'five special'
    ]);
  });
});
