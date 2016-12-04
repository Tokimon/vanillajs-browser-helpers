import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import iterate from 'vanillajs-helpers/iterate';

/**
 * Finds DOM elements with a given class name
 * @param  {String|Array<String>} classNames - Class name to find elements by
 * @param  {HTMLElement} [elm=document] - The DOM element to start the search from
 * @return {Array<HTMLElement>} - List of found DOM elements
 */
export default function findByClass(classNames, elm) {
  // Is it is a string split by comma (convert to Array)
  if(isString(classNames)) { classNames = classNames.replace(/\./g, ' ').split(/\s*[,]\s*/); }

  // 'clasNames' has to be an Array
  if(!isArray(classNames)) { return []; }

  // 'elm' must be an object with the 'getElementsByClassName' implementation
  if(!elm || !elm.getElementsByClassName) { elm = document; }

  // If only one expression have been passed in return the result as an Array
  if(classNames.length < 2) { return Array.from(elm.getElementsByClassName(classNames[0])); }

  // If several expressions have been passed in
  // we need to create an unique array of the found nodes
  return Array.from(classNames.reduce((set, cn) => {
    iterate(elm.getElementsByClassName(cn), (node) => set.add(node));
    return set;
  }, new Set()));
}
