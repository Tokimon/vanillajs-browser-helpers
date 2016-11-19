import isString from './isString';
import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';

/**
 * Prepend HTML Element or plain HTML into a given HTML Element
 * @param  {HTMLElement} elm - The HTML Element to prepend into
 * @param  {string|HTMLElement} insertElm - HTML Element or String to prepend to the {elm}
 */
export default function prepend(elm, insertElm) {
  if(!isDOMContainer(elm)) { return; }
  if(isDOMNode(insertElm)) { elm.insertBefore(insertElm, elm.firstChild); }
  else if(isString(insertElm)) { elm.insertAdjacentHTML('afterbegin', insertElm); }
}
