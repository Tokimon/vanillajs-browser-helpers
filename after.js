import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';
import selectorToHTML from './selectorToHTML';



/**
 * Inserts DOM element or plain HTML after a given DOM element
 * @function addClass
 * @param {HTMLElement} elm - The DOM element to insert after
 * @param {String|HTMLElement} insertElm - DOM element or HTML to insert
 * @return {HTMLElement|null} The inserted element
 */
export default function after(elm, insertElm) {
  if(!isDOMChildNode(elm)) { return null; }

  if(isDOMNode(insertElm)) {
    elm.parentNode.insertBefore(insertElm, elm.nextSibling);
  } else if(isString(insertElm)) {
    if(insertElm.indexOf('<') < 0) {
      insertElm = selectorToHTML(insertElm);
    }

    elm.insertAdjacentHTML('afterend', insertElm);
  } else {
    return null;
  }

  return elm.nextSibling;
}
