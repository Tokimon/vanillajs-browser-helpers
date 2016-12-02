import isString from 'vanillajs-helpers/isString';
import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';

/**
 * Prepend DOM element or plain HTML into a given DOM element
 * @param  {HTMLElement} elm - The DOM element to prepend into
 * @param  {string|HTMLElement} insertElm - DOM element or String to prepend to the {elm}
 */
export default function prepend(elm, insertElm) {
  if(!isDOMContainer(elm)) { return; }

  if(isDOMNode(insertElm)) {
    elm.insertBefore(insertElm, elm.firstChild);
  } else if(isString(insertElm)) {
    elm.insertAdjacentHTML('afterbegin', insertElm);
  }
}
