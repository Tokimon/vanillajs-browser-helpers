import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';



const byCn = (elm, cn) => elm.getElementsByClassName(cn);



/**
 * Finds DOM elements with a given class name.
 * Seperate multiple selectors by comma. Seperate multiple class names by space.
 * @function findByClass
 * @param {HTMLElement} [elm=document] - The DOM element to start the search from
 * @param {String|String[]} classNames - Class name(s) to find elements by
 * @return {HTMLElement[]} List of found DOM elements
 */
export default function findByClass(elm, classNames) {
  if (!elm) { return []; }

  if (isString(elm) || isArray(elm)) {
    [elm, classNames] = [document, elm];
  }

  if (isString(classNames)) { return Array.from(byCn(elm, classNames)); }
  if (!isArray(classNames)) { return []; }

  const nodes = classNames.reduce((set, cn) => {
    for (let node of byCn(elm, cn)) { set.add(node); }
    return set;
  }, new Set());

  return Array.from(nodes);
}
