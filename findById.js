import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Find a DOM element with the given ID
 * @function findById
 * @param {String|String[]} ids - ID to find the element by
 * @return {HTMLElement|HTMLElement[]} The found element
 */
export default function findById(ids) {
  // Is it is a string split by comma and/or space (convert to Array)
  if(isString(ids)) { ids = ids.split(/[\s,]+/); }

  // 'ids' has to be an Array at this point
  if(!isArray(ids)) { return null; }

  // If we have only one query, just find and return that
  if(ids.length < 2) { return document.getElementById(ids[0]); }

  // Search elements from each ID and filter out results that returned NULL
  return ids
    .map((id) => document.getElementById(id))
    .filter((elm) => !!elm);
}
