import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';
import after from './after';
import remove from './remove';

/**
 * Replace a given DOM element with another DOM element or plain HTML string
 * @function replace
 * @param {HTMLElement} elm - DOM element to replace
 * @param {HTMLElement|String} replacement - DOM element or plain HTML string to replace {elm}
 * @return {HTMLElement} The value given in `elm`
 */
export default function replace(elm, replacement) {
  if(!isDOMChildNode(elm)) { return elm; }

  if(isString(replacement)) {
    after(elm, replacement);
    return remove(elm);
  } else if(isDOMNode(replacement)) {
    return elm.parentNode.replaceChild(replacement, elm);
  } else if(replacement === null) {
    return remove(elm);
  }

  return elm;
}
