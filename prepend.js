import isString from 'vanillajs-helpers/isString';
import isDOMNode from './isDOMNode';
import isDOMContainer from './isDOMContainer';

/**
 * Prepend DOM element or plain HTML into a given DOM element
 * @function prepend
 * @param {HTMLElement} elm - The DOM element to prepend into
 * @param {String|HTMLElement} insertElm - DOM element or String to prepend to the {elm}
 * @return {HTMLElement|null} The inserted child element
 */
export default function prepend(elm, insertElm) {
  if(!isDOMContainer(elm)) { return null; }

  if(isDOMNode(insertElm)) {
    elm.insertBefore(insertElm, elm.firstChild);
  } else if(isString(insertElm)) {
    elm.insertAdjacentHTML('afterbegin', insertElm);
  } else {
    return null;
  }

  return elm.firstChild;
}
