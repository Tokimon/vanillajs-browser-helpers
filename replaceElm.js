import isString from 'vanillajs-helpers/isString';
import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';

/**
 * Replace a given DOM element with another DOM element or plain HTML string
 * @param  {HTMLElement} elm - DOM element to replace
 * @param  {HTMLElement|String} replacement - DOM element or plain HTML string to replace {elm}
 */
export default function replaceElm(elm, replacement) {
  if(!isDOMChildNode(elm)) { return; }

  if(isString(replacement)) {
    elm.outerHTML = replacement;
  } else if(isDOMNode(replacement)) {
    elm.parentNode.replaceChild(replacement, elm);
  }
}
