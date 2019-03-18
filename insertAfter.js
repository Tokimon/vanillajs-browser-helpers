import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isDOMChildNode from './isDOMChildNode';
import selectorToHTML from './selectorToHTML';



/**
 * Inserts DOM element or plain HTML after a given DOM element
 * @function insertAfter
 * @param {HTMLElement} elm - The DOM element to insert elements after
 * @param {String|HTMLElement} insertElm - DOM element or HTML to insert
 * @return {HTMLElement} The inserted element
 */
export default function insertAfter(elm, insertElm) {
  const node = isDOMNode(insertElm);
  if (!isDOMChildNode(elm) || (!isString(insertElm) && !node)) { return; }

  if (node) {
    elm.parentNode.insertBefore(insertElm, elm.nextSibling);
  } else {
    if (insertElm.indexOf('<') < 0) {
      insertElm = selectorToHTML(insertElm);
    }

    elm.insertAdjacentHTML('afterend', insertElm);
  }

  return elm.nextSibling;
}
