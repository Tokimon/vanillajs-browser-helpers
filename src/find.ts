import isString from 'vanillajs-helpers/isString';

import findByClass from './findByClass';
import findById from './findById';
import findByTagName from './findByTagName';
import findByQuery from './findByQuery';



/**
 * Find elements by a given selector. The selector will be lightly analysed to determine
 * the appropriate `findByXX` function. This should be faster than just [running querySelector(All)
 * to find elements](https://jsperf.com/queryselector-vs-selective-find/1)
 *
 * @param selector - The selector to use
 * @return List of found DOM elements
 */
 function find(selector: string): HTMLElement | Element | Element[] | null;

/**
 * Find elements by a given selector from a given element. The selector will be lightly analysed to determine
 * the appropriate `findByXX` function. This should be faster than just [running querySelector(All)
 * to find elements](https://jsperf.com/queryselector-vs-selective-find/1)
 *
 * @param elm - The DOM element to start the search from
 * @param selector - The selector to use
 * @return List of found DOM elements
 */
function find(
  elm: Document | Element,
  selector: string
): HTMLElement | Element | Element[] | null;



function find(
  elm: Document | Element | string,
  selector?: string
): HTMLElement | Element | Element[] | null {
  if (isString(elm)) {
    [elm, selector] = [document, elm];
  }

  const query = selector as string;
  const isComplex = [' ', '>', '+', '*', '~', ':', '[', ',']
    .some((char) => query.indexOf(char) > -1);

  if (!isComplex) {
    const firstChar = query[0];
    const rest = query.substring(1);

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

  return findByQuery(elm, query);
}

export default find;
