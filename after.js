import isString from 'vanillajs-helpers/isString';
import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';

/**
 * Inserts DOM Element or plain HTML after a given DOM Element
 * @param  {HTMLElement} elm - The DOM Element to insert after
 * @param  {String|HTMLElement} insertElm - DOM Element or HTML to insert
 */
export default function after(elm, insertElm) {
  if(!isDOMChildNode(elm)) { return; }
  if(isDOMNode(insertElm)) { elm.parentNode.insertBefore(insertElm, elm.nextSibling); } else if(isString(insertElm)) { elm.insertAdjacentHTML('afterend', insertElm); }
}
