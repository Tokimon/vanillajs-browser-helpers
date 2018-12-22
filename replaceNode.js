import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';
import insertAfter from './insertAfter';
import removeNode from './removeNode';



/**
 * Replace a given DOM element with another DOM element or plain HTML string
 * @function replaceNode
 * @param {HTMLElement} elm - DOM element to replace
 * @param {HTMLElement|String} replacement - DOM element or plain HTML string to replace {elm}
 * @return {HTMLElement} The value given in `elm`
 */
export default function replaceNode(elm, replacement) {
  if (!isDOMChildNode(elm)) { return elm; }

  if (!replacement) {
    return removeNode(elm);
  } else if (isString(replacement)) {
    insertAfter(elm, replacement);
    return removeNode(elm);
  } else if (isDOMNode(replacement)) {
    return elm.parentNode.replaceChild(replacement, elm);
  }

  return elm;
}
