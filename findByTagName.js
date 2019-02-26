import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import uniqueArray from 'vanillajs-helpers/uniqueArray';



const byTag = (elm, tag) => Array.from(elm.getElementsByTagName(tag));



/**
 * Find elements by given tag name
 * @function findByTagName
 * @param {HTMLElement} [elm=document] - The DOM element to start the search from
 * @param {String|String[]} tags - Tag name to find the elements by
 * @return {HTMLElement[]} List of found DOM elements
 */
export default function findByTagName(elm, tags) {
  if (isString(elm) || isArray(elm)) {
    [elm, tags] = [document, elm];
  }

  if (isString(tags)) { return byTag(elm, tags); }
  if (!isArray(tags)) { return []; }

  return uniqueArray(tags).reduce((arr, tag) => arr.concat(byTag(elm, tag)), []);
}
