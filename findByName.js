import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';



const byName = (name) => document.getElementsByName(name);



/**
 * Find DOM elements with the given name
 * @function findByName
 * @param {String|String[]} names - Value of name attribute to find the elements by
 * @return {HTMLElement[]} List of found DOM elements
 */
export default function findByName(names) {
  if (isString(names)) { return Array.from(byName(names)); }
  if (!isArray(names)) { return []; }

  const nodes = names
    .reduce((set, name) => {
      for (let node of byName(name)) { set.add(node); }
      return set;
    }, new Set());

  return Array.from(nodes);
}
