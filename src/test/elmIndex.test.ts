import { insertHtml, removeElement, byId, generateId, createElement } from './assets/helpers';

import elmIndex from '../elmIndex';



const testID = generateId('ElmIndex');
const SubNodeID = generateId('SubNode');



describe('"elmIndex"', () => {
  beforeAll(() => insertHtml(`<div id="${testID}"><b></b><b id='${SubNodeID}'></b><b><b></div>`));
  afterAll(() => removeElement(testID));

  it('Should return the index of a DOM element among its siblings', () => {
    const node = byId(SubNodeID) as Element;
    const index = elmIndex(node);
    expect(index).toBe(1);
    expect((byId(testID) as Element).childNodes[index]).toBe(node);

    const p = createElement('p');
    p.innerHTML = '<b></b><b></b><b></b>';
    expect(elmIndex(p.childNodes[2] as Element)).toBe(2);
  });

  it('Should return -1 if the element is not a Child Element', () => {
    const node = createElement('p');
    expect(elmIndex(node)).toBe(-1);
    expect(elmIndex(document.documentElement)).toBe(-1);
  });
});
