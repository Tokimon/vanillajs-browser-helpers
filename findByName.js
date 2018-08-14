import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import indexLoop from 'vanillajs-helpers/indexLoop';

/**
 * Find DOM elements with the given name
 * @function findByName
 * @param {String|String[]} names - Value of name attribute to find the elements by
 * @return {HTMLElement[]} List of found DOM elements
 */
export default function findByName(names) {
  // Is it is a string split by comma (convert to Array)
  if(isString(names)) { names = names.split(/[\s,]+/); }

  // 'names' has to be an Array at this point
  if(!isArray(names)) { return []; }

  if(names.length < 2) { return Array.from(document.getElementsByName(names[0])); }

  return Array.from(names.reduce((set, name) => {
    indexLoop(document.getElementsByName(name), (elm) => set.add(elm));
    return set;
  }, new Set()));
}
