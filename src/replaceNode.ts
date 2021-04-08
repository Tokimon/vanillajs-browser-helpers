import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';
import insertAfter from './insertAfter';



/**
 * Replace a given DOM element with another DOM element or plain HTML string
 *
 * @param elm - DOM element to replace
 * @param replacement - DOM element or plain HTML string to replace {elm}
 * @return The value given in `elm`
 */
export default function replaceNode(elm: Element, replacement?: Element | string): void {
  if (!isDOMChildNode(elm)) { return; }

  if (isDOMNode(replacement)) {
    return elm.replaceWith(replacement, elm);
  }

  isString(replacement) && insertAfter(elm, replacement);
  elm.remove();
}
