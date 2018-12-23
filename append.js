import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';



/**
 * Append DOM element or plain HTML to the end of a given DOM element
 * @function append
 * @param {HTMLElement} elm - The DOM element to append to
 * @param {String|HTMLElement} insertElm - DOM element or String to append to the {elm}
 * @return {HTMLElement} The inserted child element
 */
export default function append(elm, insertElm) {
  const isNode = isDOMNode(insertElm);
  if (!isDOMContainer(elm) || (!isString(insertElm) && !isNode)) { return null; }

  if (isNode) {
    elm.appendChild(insertElm);
  } else {
    elm.insertAdjacentHTML('beforeend', insertElm);
  }

  return elm.lastChild;
}
