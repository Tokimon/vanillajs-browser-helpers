import { getOne, insertHtml, byId, removeElement, createElement, generateId } from './assets/helpers';

import append from '../append';



const testID = generateId('Append');
const insertHTML = '<div class="inserted"></div>';



describe('"append"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => { testNode.innerHTML = '<span></span>'; });

  afterAll(() => removeElement(testID));

  it('Returns null when DOM element to append to is not a container element', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(append(document.parentNode as Element, insertHTML)).toBe(null);
  });

  it('Appends plain HTML to a DOM element', () => {
    append(testNode, insertHTML);
    expect((testNode.lastChild as Element).className).toBe('inserted');
  });

  it('Appends DOM element to a DOM element', () => {
    const div = createElement('div');
    div.className = 'inserted';

    append(testNode, div);
    expect((testNode.lastChild as Element).className).toBe('inserted');
  });

  it('Appends to DOM elements not in the DOM', () => {
    const div = createElement('div');

    append(div, insertHTML);

    expect(div.lastChild).not.toBeFalsy();
    expect((div.lastChild as Element).className).toBe('inserted');
  });

  it('Moves element from one DOM element to another', () => {
    testNode.innerHTML = '<div class="insert-container"></div><div class="moved"></div>';

    const insertContainer = getOne('.insert-container', testNode) as Element;
    const moved = getOne('.moved', testNode) as Element;

    append(insertContainer, moved);

    expect(testNode.lastChild).toBe(insertContainer);
    expect((insertContainer.lastChild as Element).className).toBe('moved');
  });

  it('Return the inserted DOM element', () => {
    const div = createElement('div');
    expect(append(testNode, div) as Element).toBe(div);
  });

  it('Return the inserted DOM element from HTML', () => {
    const html = '<div class="html"></div>';

    const elm = append(testNode, html) as Element;
    expect(elm.className).toBe('html');
  });
});
