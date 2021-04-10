import isString from 'vanillajs-helpers/isString';

import ensureHTML from './ensureHTML';



/**
 * Inserts DOM element or plain HTML before a given DOM element
 * 
 * @param elm - The DOM element to insert elements before
 * @param insertElm - DOM element or HTML (or selector) to insert
 * @return The inserted element
 */
export default function insertBefore(elm: Element, insertElm: string | Element) {
  if (isString(insertElm)) {
    elm.insertAdjacentHTML('beforebegin', ensureHTML(insertElm));
  } else {
    elm.insertAdjacentElement('beforebegin', insertElm);
  }

  return elm.previousElementSibling;
}
