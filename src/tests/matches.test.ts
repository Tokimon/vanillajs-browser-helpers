import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

import matches from '../matches';



const testID = generateId('Matches');



describe('"matches"', () => {
  insertHtml(`<div id="${testID}"><span class="class"><b></b></span></div>`);
  const testNode = byId(testID);
  const firstChild = testNode.firstElementChild as Element;

  afterAll(() => removeElement(testID));

  describe('Returns `true`', () => {
    it.each([
      ['Tag Name', document.body, 'body'],
      ['ID', testNode, '#' + testID],
      ['Class Name', firstChild, '.class']
    ])('When a DOM element matches a given CSS selector: %s', (_, elm, selector) => {
      expect(matches(elm, selector)).toBe(true);
    });
  });

  describe('Returns `false`', () => {
    it.each([
      ['.class', testNode],
      ['#' + testID, firstChild],
      ['html', document.body]
    ])('When a DOM element does not match a given CSS selector: %s', (selector, elm) => {
      expect(matches(elm, selector)).toBe(false);
    });
  });
});
