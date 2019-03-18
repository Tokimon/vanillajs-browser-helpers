import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';
import selectorToHTML from './selectorToHTML';



/**
 * Inserts DOM element or plain HTML before a given DOM element
 * @function insertBefore
 * @param {HTMLElement} elm - The DOM element to insert {insertElm} before
 * @param {String|HTMLElement} insertElm - DOM element or String to insert before the {elm}
 * @return {HTMLElement}
 */
export default function insertBefore(elm, insertElm) {
  const node = isDOMNode(insertElm);
  if (!isDOMChildNode(elm) || (!isString(insertElm) && !node)) { return; }

  if (node) {
    elm.parentNode.insertBefore(insertElm, elm);
  } else {
    if (insertElm.indexOf('<') < 0) {
      insertElm = selectorToHTML(insertElm);
    }

    elm.insertAdjacentHTML('beforebegin', insertElm);
  }

  return elm.previousSibling;
}
