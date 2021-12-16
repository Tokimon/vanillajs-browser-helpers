import { insertHtml, removeElement, createElement, byId, generateId } from './assets/helpers';

import children from '../children';



const testID = generateId('Children');



describe('"children"', () => {
  beforeAll(() => insertHtml(`
    <div id="${testID}">
      <span><b></b></span>
      text
      <br>
      <span><i></i><span>
    </div>
  `));

  afterAll(() => removeElement(testID));

  it('Should get all the children of a given DOM element', () => {
    const node = byId(testID) as Element;
    const childElements = children(node);

    expect(childElements).toHaveLength(3);
  });

  it('Should return child elements of an element not yet in the DOM', () => {
    const div = createElement('div');
    div.innerHTML = `
      <span><b></b></span>
      text
      <br>
      <span><i></i><span>
    `;

    const childElements = children(div);

    expect(childElements).toHaveLength(3);
  });
});
