import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

import siblings from '../siblings';



const testID = generateId('Siblings');



describe('"siblings"', () => {
  beforeAll(() => insertHtml(
    `<div id="${testID}">
      <span id="FirstChild">
        <b id="LoneChild"></b>
      </span>
      text
      <br>
      <span id="NoChild"></span>
      <span id="LastChild"></span>
    </div>`
  ));

  afterAll(() => removeElement(testID));

  it.each([
    ['Document', document],
    ['Unappended element', createElement('div')]
  ])('Returns empty array when the given node is not a child in the DOM: %s', (_, elm) => {
    expect(siblings(elm)).toHaveLength(0);
  });

  it('Returns an array of siblings of the element', () => {
    const elm = byId(testID).firstChild as Node;
    const elms = siblings(elm);

    expect(elms).toHaveLength(4);
    expect(elms.every((node) => node !== elm)).toBe(true);
  });

  it('Returns an empty array when the element has no siblings', () => {
    const elm = byId('LoneChild') as Node;
    const elms = siblings(elm);

    expect(elms).toHaveLength(0);
  });
});
