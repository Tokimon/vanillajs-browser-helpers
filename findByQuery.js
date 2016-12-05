import isBoolean from 'vanillajs-helpers/isBoolean';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Find elements by given CSS selector
 * @param  {String|Array<String>} queries - CSS selector to find elements by
 * @param  {HTMLElement} [elm=document] - The DOM element to start the search from
 * @param  {Boolean} [first=false] - Return only the first found element
 * @return {HTMLElement|Array<HTMLElement>} - List of found DOM elements
 */
export default function findByQuery(queries, elm, first = false) {
  // Correct variables if 'elm' is omitted but 'first' isn't
  if(isBoolean(elm)) { [elm, first] = [document, elm]; }
  // If we got an array, filter out bad queries and convert to a string
  if(isArray(queries)) { queries = queries.filter((query) => isString(query)).join(','); }
  // Query must be string at this point
  if(!isString(queries)) { return first ? null : []; }

  // 'elm' must be an object with the 'querySelector' implementation
  if(!elm || !elm.querySelector) { elm = document; }

  try {
    return first ? elm.querySelector(queries) : Array.from(elm.querySelectorAll(queries));
  } catch(ex) {
    throw new Error(`"findByQuery" failed, bad query given: "${queries}"`);
  }
}
