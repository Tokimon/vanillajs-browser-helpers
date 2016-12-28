import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Find elements by given tag name
 * @function findByTagName
 * @param {String|String[]} tags - Tag name to find the elements by
 * @param {HTMLElement} [elm=document] - The DOM element to start the search from
 * @return {HTMLElement[]} List of found DOM elements
 */
export default function findByTagName(tags, elm) {
  // Is it is a string split by comma (convert to Array)
  if(isString(tags)) { tags = tags.split(/[\s,]+/); }

  // Tag names has to be an Array
  if(!isArray(tags)) { return []; }

  // 'elm' must be an object with the 'getElementsByTagName' implementation
  if(!elm || !elm.getElementsByTagName) { elm = document; }

  // Find results for each tag
  return tags.reduce((arr, tag) => {
    // The [...elm.getElementsByTagName(tag)] seems to filter out identical tags,
    // so Array.from is preferred
    if(!isString(tag)) { return arr; }
    return arr.concat(Array.from(elm.getElementsByTagName(tag)));
  }, []);
}
