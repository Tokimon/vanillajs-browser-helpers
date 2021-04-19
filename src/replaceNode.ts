import isString from 'vanillajs-helpers/isString';

import isDOMChildNode from './isDOMChildNode';
import create from './create';



/**
 * Replace a given DOM element with another DOM element or plain HTML string
 *
 * @param elm - DOM element to replace
 * @param replacement - DOM element or plain HTML string to replace {elm}
 * @return The value given in `elm`
 */
export default function replaceNode(elm: Node, replacement?: Node | string): Node | void {
  if (!isDOMChildNode(elm)) { return; }
  if (!replacement) { return elm.remove(); }

  if (isString(replacement)) {
    replacement = create(replacement);
  }

  elm.replaceWith(replacement);
  return elm;
}
