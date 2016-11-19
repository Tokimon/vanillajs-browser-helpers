import isString from './isString';
import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';

/**
 * Append HTML Element or plain HTML to the end of a given HTML Element
 * @param  {HTMLElement} elm - The HTML Element to append to
 * @param  {String|HTMLElement} insertElm - HTML Element or String to append to the {elm}
 */
export default function append(elm, insertElm) {
  if(!isDOMContainer(elm)) { return; }
  if(isDOMNode(insertElm)) { elm.appendChild(insertElm); }
  else if(isString(insertElm)) { elm.insertAdjacentHTML('beforeend', insertElm); }
}
