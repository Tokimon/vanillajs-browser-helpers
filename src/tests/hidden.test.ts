import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

import hidden from '../hidden';



const testID = generateId('Hidden');

const sizeStyle = 'width: 10px; height: 10px;';
const visibleStyle = `${sizeStyle} opacity: 1;`;



describe('"hidden"', () => {
  beforeAll(() => insertHtml(`
    <div id="${testID}">
      <style id="Style">
        #NoDisplay { display: none; }
        #NotVisible { visibility: hidden; }
        #NoSize { width: 0; height: 0; }
      </style>

      <div id="Visible" style="${visibleStyle}"></div>
      <div id="NoDisplay" style="opacity: 1;"><div id="ChildDisplay"></div></div>
      <div id="NotVisible" style="${visibleStyle}"><div id="ChildVisibility"></div></div>
      <div id="NoSize"></div>
    </div>
  `));

  afterAll(() => {
    removeElement(testID);
  });

  it('Returns `true` when the DOM element is "display: none"', () => {
    const node = byId('NoDisplay');
    expect(hidden(node)).toBe(true);
  });

  it('Returns `true` when the DOM element is a child of an element that is "display: none"', () => {
    const node = byId('ChildDisplay');
    expect(hidden(node)).toBe(true);
  });

  it('Returns `true` when the DOM element is "visibility: hidden"', () => {
    const node = byId('NotVisible');
    expect(hidden(node)).toBe(true);
  });

  it('Returns `true` when the DOM element is a child of an element that is "visibility: hidden"', () => {
    const node = byId('ChildVisibility');
    expect(hidden(node)).toBe(true);
  });

  it('Returns `true` when the DOM element is not in the DOM', () => {
    const node = createElement('div');
    expect(hidden(node)).toBe(true);
  });

  it('Returns `true` when the DOM element is a child of an element that is not in the DOM', () => {
    const node = createElement('div');
    node.innerHTML = '<p></p>';
    expect(hidden(node.firstElementChild as HTMLElement)).toBe(true);
  });

  it('Returns `true` the DOM element has no size', () => {
    const node = createElement('div');
    expect(hidden(node)).toBe(true);
  });

  it('Returns `false` when the DOM element is in the DOM and is not styled hidden', () => {
    const node = byId('Visible');
    expect(hidden(node)).toBe(false);
  });
});
