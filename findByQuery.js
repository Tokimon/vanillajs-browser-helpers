import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';



/**
 * Find elements by given CSS selector
 * @function findByQuery
 * @param {HTMLElement} [elm=document] - The DOM element to start the search from
 * @param {String|String[]} queries - CSS selector to find elements by
 * @param {Boolean} first - Return only the first found element
 * @return {HTMLElement|HTMLElement[]} List of found DOM elements
 */
export default function findByQuery(elm, queries, first) {
  if (isString(elm) || isArray(elm)) {
    [elm, queries, first] = [document, elm, queries];
  }

  if (!elm) { elm = document; }

  if (isArray(queries)) { queries = queries.join(','); }
  if (!isString(queries)) { return first ? null : []; }

  return first
    ? elm.querySelector(queries)
    : Array.from(elm.querySelectorAll(queries));
}
