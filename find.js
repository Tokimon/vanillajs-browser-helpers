import isString from 'vanillajs-helpers/isString';

import findByClass from './findByClass';
import findById from './findById';
import findByTagName from './findByTagName';
import findByQuery from './findByQuery';



/**
 * Find elements by a given selector. The selector will be lightly analysed to determine
 * the appropriate `findByXX` function. This should be faster than just [running querySelector(All)
 * to find elements](https://jsperf.com/queryselector-vs-selective-find/1)
 * @function find
 * @param  {HTMLElement} [elm=document] - The DOM element to start the search from
 * @param  {String} selector - The selector to use
 * @return {HTMLElement[]} List of found DOM elements
 */
export default function find(elm, selector) {
  if (isString(elm)) {
    [elm, selector] = [document, elm];
  }

  const isComplex = [' ', '>', '+', '*', '~', ':', '[', ',']
    .some((char) => selector.indexOf(char) > -1);

  if (!isComplex) {
    const firstChar = selector[0];
    const rest = selector.substring(1);

    const isId = firstChar === '#';
    const isClass = firstChar === '.';
    const hasClass = rest.indexOf('.') > -1;
    const hasId = rest.indexOf('#') > -1;

    if (isId && !hasClass) {
      return findById(rest);
    }

    if (isClass && !hasId) {
      return findByClass(elm, rest.replace(/\./g, ' '));
    }

    if (!isClass && !isId && !(hasId || hasClass)) {
      return findByTagName(elm, selector);
    }
  }

  return findByQuery(elm, selector);
}
