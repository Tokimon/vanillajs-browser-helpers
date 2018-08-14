import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import indexLoop from 'vanillajs-helpers/indexLoop';



/**
 * Finds DOM elements with a given class name.
 * Seperate multiple selectors by comma. Seperate multiple class names by space.
 * @function findByClass
 * @param {String|String[]} classNames - Class name to find elements by
 * @param {HTMLElement} [context=document] - The DOM element to start the search from
 * @return {HTMLElement[]} List of found DOM elements
 */
export default function findByClass(classNames, context) {
  if(isString(classNames)) { classNames = classNames.replace(/\./g, ' ').split(/[,]+/); }
  if(!isArray(classNames)) { return []; }

  if(!context || !context.getElementsByClassName) { context = document; }

  if(classNames.length < 2) {
    return Array.from(context.getElementsByClassName(classNames[0]));
  }

  // If several expressions have been passed in
  // we need to create an unique array of the found nodes
  return Array.from(classNames.reduce((set, cn) => {
    indexLoop(context.getElementsByClassName(cn), (node) => set.add(node));
    return set;
  }, new Set()));
}
