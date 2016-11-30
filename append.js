import isString from 'vanillajs-helpers/isString';
import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';

/**
 * Append DOM Element or plain HTML to the end of a given DOM Element
 * @param  {HTMLElement} elm - The DOM Element to append to
 * @param  {String|HTMLElement} insertElm - DOM Element or String to append to the {elm}
 */
export default function append(elm, insertElm) {
  if(!isDOMContainer(elm)) { return; }
  if(isDOMNode(insertElm)) { elm.appendChild(insertElm); } else if(isString(insertElm)) { elm.insertAdjacentHTML('beforeend', insertElm); }
}
