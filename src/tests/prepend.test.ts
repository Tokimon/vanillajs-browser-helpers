import { insertHtml, byId, removeElement, createElement, generateId } from './assets/helpers';

import prepend from '../prepend';



const testID = generateId('Prepend');
const insertHTML = '<div class="inserted"></div>';



describe('"prepend"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => { testNode.innerHTML = '<span></span>'; });

  afterAll(() => removeElement(testID));

  it('Returns null when DOM element to prepend to is not a container element', () => {
    // This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
    expect(prepend(document.parentNode as Element, insertHTML)).toBe(null);
  });

  it('Prepends plain HTML to a DOM element', () => {
    prepend(testNode, insertHTML);
    expect((testNode.firstChild as Element).className).toBe('inserted');
  });

  it('Prepends DOM element to a DOM element', () => {
    const div = createElement('div');

    prepend(testNode, div);
    expect(testNode.firstChild).toBe(div);
  });

  it('Prepends to DOM elements not in the DOM', () => {
    const div = createElement('div');

    prepend(div, insertHTML);

    expect((div.firstChild as Element).className).toBe('inserted');
  });

  it('Moves element from one DOM element to another', () => {
    const insertContainer = createElement('div');
    const moved = createElement('div');

    testNode.appendChild(insertContainer);
    testNode.appendChild(moved);

    expect(testNode.lastChild).toBe(moved);

    prepend(insertContainer, moved);

    expect(testNode.lastChild).toBe(insertContainer);
    expect(insertContainer.firstChild).toBe(moved);
  });

  it('Return the inserted DOM element', () => {
    const div = createElement('div');
    expect(prepend(testNode, div)).toBe(div);
  });

  it('Return the inserted DOM element from HTML', () => {
    const html = '<div class="html"></div>';

    const elm = prepend(testNode, html) as Element;
    expect(elm.className).toBe('html');
  });
});
