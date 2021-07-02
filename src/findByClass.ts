import isString from 'vanillajs-helpers/isString';

import findUniqueNodeCollection from './findUniqueNodeCollection';



const byCn = (elm: Document | Element) => (cn: string) => elm.getElementsByClassName(cn);



/**
 * Finds DOM elements with a given class name.
 * Separate multiple selectors by comma. Separate multiple class names by space.
 *
 * @param classNames - Class name(s) to find elements by
 * @return List of found DOM elements
 */
function findByClass(
  classNames: string | string[]
): Element[]

/**
 * Finds DOM elements with a given class name from a given element.
 * Separate multiple selectors by comma. Separate multiple class names by space.
 *
 * @param elm - The DOM element to start the search from
 * @param classNames - Class name(s) to find elements by
 * @return List of found DOM elements
 */
function findByClass(
  elm: Document | Element,
  classNames: string | string[]
): Element[]



function findByClass(
  elm: Document | Element | string | string[],
  classNames?: string | string[]
): Element[] {
  if (isString(elm) || Array.isArray(elm)) {
    [elm, classNames] = [document, elm];
  }

  return findUniqueNodeCollection(
    classNames as string | string[],
    byCn(elm)
  );
}

export default findByClass;
