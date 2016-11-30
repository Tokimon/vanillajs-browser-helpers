import isString from 'vanillajs-helpers/isString';
import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';

/**
 * Inserts DOM Element or plain HTML before a given DOM Element
 * @param  {HTMLElement} elm - The DOM Element to insert {insertElm} before
 * @param  {String|HTMLElement} insertElm - DOM Element or String to insert before the {elm}
 */
export default function before(elm, insertElm) {
  if(!isDOMChildNode(elm)) { return; }
  if(isDOMNode(insertElm)) { elm.parentNode.insertBefore(insertElm, elm); } else if(isString(insertElm)) { elm.insertAdjacentHTML('beforebegin', insertElm); }
}
