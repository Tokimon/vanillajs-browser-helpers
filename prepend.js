import isString from 'vanillajs-helpers/isString';
import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';

/**
 * Prepend DOM Element or plain HTML into a given DOM Element
 * @param  {HTMLElement} elm - The DOM Element to prepend into
 * @param  {string|HTMLElement} insertElm - DOM Element or String to prepend to the {elm}
 */
export default function prepend(elm, insertElm) {
  if(!isDOMContainer(elm)) { return; }

  if(isDOMNode(insertElm)) {
    elm.insertBefore(insertElm, elm.firstChild);
  } else if(isString(insertElm)) {
    elm.insertAdjacentHTML('afterbegin', insertElm);
  }
}
