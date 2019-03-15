import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';



/**
 * Prepend DOM element or plain HTML into a given DOM element
 * @function prepend
 * @param {HTMLElement} elm - The DOM element to prepend into
 * @param {String|HTMLElement} insertElm - DOM element or String to prepend to the {elm}
 * @return {HTMLElement|null} The inserted child element
 */
export default function prepend(elm, insertElm) {
  const node = isDOMNode(insertElm);
  if (!isDOMContainer(elm) || (!isString(insertElm) && !node)) { return null; }

  if (node) {
    if (elm.prepend) {
      elm.prepend(insertElm);
    } else {
      elm.insertBefore(insertElm, elm.firstChild);
    }
  } else {
    elm.insertAdjacentHTML('afterbegin', insertElm);
  }

  return elm.firstChild;
}
