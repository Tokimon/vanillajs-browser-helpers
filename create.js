import isString from 'vanillajs-helpers/isString';

import selectorToHTML from './selectorToHTML';
import toDOM from './toDOM';



/**
 * Creates an element from a given CSS selector (restricted to only one element)
 * @function create
 * @param {String} [selector = 'div'] - The CSS selector to convert
 * @return {HTMLElement} The created element
 */
export default function create(selector) {
  if (!isString(selector)) { selector = 'div'; }

  return /^[a-z]+$/i.test(selector)
    ? document.createElement(selector)
    : toDOM(selectorToHTML(selector))[0];
}
