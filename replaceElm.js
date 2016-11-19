import isString from './isString';
import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';

/**
 * Replace a given HTML Element with another HTML Element or plain HTML string
 * @param  {HTMLElement} elm - HTML Element to replace
 * @param  {HTMLElement|String} replacement - HTML Element or plain HTML string to replace {elm}
 */
export default function replaceElm(elm, replacement) {
  if(!isDOMChildNode(elm)) { return; }
  if(isString(replacement)) { elm.outerHTML = replacement; }
  else if(isDOMNode(replacement)) { elm.parentNode.replaceChild(replacement, elm); }
}
