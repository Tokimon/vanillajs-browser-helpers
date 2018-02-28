import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';
import selectorToHTML from './selectorToHTML';



/**
 * Inserts DOM element or plain HTML before a given DOM element
 * @function before
 * @param {HTMLElement} elm - The DOM element to insert {insertElm} before
 * @param {String|HTMLElement} insertElm - DOM element or String to insert before the {elm}
 * @return {HTMLElement|null}
 */
export default function before(elm, insertElm) {
  if(!isDOMChildNode(elm)) { return null; }

  if(isDOMNode(insertElm)) {
    elm.parentNode.insertBefore(insertElm, elm);
  } else if(isString(insertElm)) {
    if(insertElm.indexOf('<') < 0) {
      insertElm = selectorToHTML(insertElm);
    }

    elm.insertAdjacentHTML('beforebegin', insertElm);
  } else {
    return null;
  }

  return elm.previousSibling;
}
